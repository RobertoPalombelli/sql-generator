import { useState } from "react";
import { useHistory } from "./hooks/useHistory";
import { v4 as uuidv4 } from "uuid";
import Header from "./components/Header";
import HistoryDrawer from "./components/HistoryDrawer";
import DialectSelector from "./components/DialectSelector";
import SchemaEditor from "./components/SchemaEditor";
import QueryInput from "./components/QueryInput";
import ResultDisplay from "./components/ResultDisplay";
import { ToastContainer, toast,Bounce } from "react-toastify";
import { generateSqlFromNaturalLanguage } from "./api/sqlApi";

const App = () => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const { history, addToHistory, toggleSaved, deleteItem } = useHistory();

  const [dialect, setDialect] = useState("MySQL");
  const [schema, setSchema] = useState("");
  const [query, setQuery] = useState("");
  const [generatedSql, setGeneratedSql] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [conversationId] = useState(uuidv4());

  const loadHistoryItem = (item) => {
    setDialect(item.dialect);
    setQuery(item.naturalQuery);
    setGeneratedSql(item.generatedSql);
    setExplanation(item.explanation || null);
    if (item.schemaSnapshot) {
      setSchema(item.schemaSnapshot);
    }
    setError(null);
  };

  const handleGenerate = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setGeneratedSql(null);
    setExplanation(null);

    try {
      const generate = await generateSqlFromNaturalLanguage({
        dialect,
        schemaContent: schema.trim() || "",
        naturalLanguageQuery: query,
        conversationId,
      });

      addToHistory(
        query,
        generate.sql,
        dialect,
        schema.trim() || undefined,
        generate.explanation
      );

      setGeneratedSql(generate.sql);
      setExplanation(generate.explanation);
    } catch (error) {
      setError("An unexpected error occurred.");
      toast.warn("An unexpected error occurred.")
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="min-h-screen bg-slate-50 text-gray-900 font-sans pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
          <Header onOpenHistory={() => setIsHistoryOpen(true)} />
          <main className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-white/50 ring-1 ring-gray-100">
            <DialectSelector selectedDialect={dialect} onSelect={setDialect} />
            <div className="border-t border-gray-100 my-6"></div>
            <SchemaEditor schema={schema} onChange={setSchema} />
            <div className="border-t border-gray-100 my-6"></div>
            <QueryInput
              value={query}
              onChange={setQuery}
              onGenerate={handleGenerate}
              isLoading={loading}
            />

            <ResultDisplay
              sql={generatedSql}
              explanation={explanation}
              error={error}
            />
          </main>
        </div>

        <HistoryDrawer
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
          history={history}
          onSelect={loadHistoryItem}
          onToggleSave={toggleSaved}
          onDelete={deleteItem}
        />
      </div>
    </>
  );
};

export default App;
