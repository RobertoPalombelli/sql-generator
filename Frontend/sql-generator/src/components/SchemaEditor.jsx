import { useRef, useState, useMemo } from "react";
import {
  parseSchemaComplex,
  PLACEHOLDER_SCHEMA,
  getDataTypeIcon,
} from "../utilsTable";

const SchemaEditor = ({ schema, onChange }) => {
  const fileInputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState("code");
  const parsedTables = useMemo(() => parseSchemaComplex(schema), [schema]);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content === 'string') {
        onChange(content);
        setIsOpen(true);
        setViewMode('visual');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <label className="block text-sm font-semibold text-gray-700">
          2. Define the Schema{" "}
          <span className="text-gray-400 font-normal">(Optional)</span>
        </label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-xs text-gray-600 font-medium hover:text-primary-600 flex items-center gap-1 bg-white border border-gray-200 px-3 py-1 rounded-md transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-3.5 h-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            Load SQL
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".sql,.txt"
            className="hidden"
          />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-xs text-primary-600 font-medium hover:text-primary-700 flex items-center gap-1 bg-primary-50 px-2 py-1 rounded-md transition-colors"
          >
            {isOpen ? "Hide" : "Handle Schema"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className={`w-3 h-3 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="relative animate-in fade-in slide-in-from-top-2 duration-300 border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <div className="flex border-b border-gray-100 bg-gray-50/50">
            <button
              onClick={() => setViewMode("code")}
              className={`flex-1 px-4 py-2 text-xs font-medium transition-colors ${
                viewMode === "code"
                  ? "text-primary-600 bg-white border-b-2 border-primary-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Editor SQL
            </button>
            <button
              onClick={() => setViewMode("visual")}
              className={`flex-1 px-4 py-2 text-xs font-medium transition-colors ${
                viewMode === "visual"
                  ? "text-primary-600 bg-white border-b-2 border-primary-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Table Viewer{" "}
              <span className="ml-1 px-1.5 py-0.5 bg-gray-200 text-gray-600 rounded-full text-[10px]">
                {" "}
                {parsedTables.length}
              </span>
            </button>
          </div>

          {viewMode === "code" ? (
            <div className="relative">
              <textarea
                value={schema}
                onChange={(e) => onChange(e.target.value)}
                placeholder={PLACEHOLDER_SCHEMA}
                className="w-full h-64 p-4 bg-gray-900 text-gray-100 font-mono text-xs sm:text-sm border-none focus:ring-0 outline-none resize-none custom-scrollbar"
                spellCheck={false}
              />
              <div className="absolute top-2 right-2 text-xs text-gray-500 bg-gray-800/80 px-2 py-1 rounded backdrop-blur-sm pointer-events-none">
                DDL Input
              </div>
            </div>
          ) : (
            <div className="h-64 p-4 bg-slate-50 overflow-y-auto custom-scrollbar">
              {parsedTables.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10 mb-2 opacity-50"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-9.75 0h9.75"
                    />
                  </svg>
                  <p className="text-sm">
                    No tables found in the schema.
                  </p>
                  <p className="text-xs mt-1">
                    Enter CREATE TABLE statements in the editor.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {parsedTables.map((table, i) => (
                    <div
                      key={i}
                      className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                    >
                      {/* Table Header */}
                      <div className="flex items-center gap-2 px-3 py-2 bg-linear-to-r from-gray-50 to-white border-b border-gray-100">
                        <div className="bg-primary-100 p-1.5 rounded-lg shadow-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-4 h-4 text-primary-700"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm2.25 8.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 3a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <h4
                          className="font-semibold text-sm text-gray-800 truncate"
                          title={table.name}
                        >
                          {table.name}
                        </h4>
                        <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 rounded-full ml-auto">
                          {table.columns.length} col
                        </span>
                      </div>

                      {/* Columns List */}
                      <div className="divide-y divide-gray-50 max-h-48 overflow-y-auto custom-scrollbar">
                        {table.columns.map((col, idx) => (
                          <div
                            key={idx}
                            className="px-3 py-2 flex items-center justify-between text-xs hover:bg-gray-50 transition-colors group"
                          >
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              {/* PK / FK Status Icon */}
                              <div className="w-4 flex justify-center shrink-0">
                                {col.isPrimaryKey ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-3.5 h-3.5 text-amber-500 drop-shadow-sm"
                                  >
                                    <title>Primary Key</title>
                                    <path
                                      fillRule="evenodd"
                                      d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                ) : col.isForeignKey ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-3.5 h-3.5 text-gray-400 group-hover:text-primary-500 transition-colors"
                                  >
                                    <title>{`Foreign Key: ${col.references}`}</title>
                                    <path
                                      fillRule="evenodd"
                                      d="M12.577 4.878a6.492 6.492 0 00-1.154-.763l-.79-.431a3.25 3.25 0 00-3.266 0l-.79.431a6.492 6.492 0 00-1.154.763l-.281.233a3.25 3.25 0 00-1.026 1.838l-.133.626A6.5 6.5 0 004.28 9.904l.134.626a3.25 3.25 0 001.025 1.837l.282.234a6.494 6.494 0 001.154.762l.79.431a3.25 3.25 0 003.266 0l.79-.431a6.492 6.492 0 001.154-.763l.281-.233a3.25 3.25 0 001.026-1.838l.133-.626a6.5 6.5 0 00-.296-2.33l-.134-.626a3.25 3.25 0 00-1.025-1.837l-.282-.234zM10 5a2 2 0 110 4 2 2 0 010-4z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                ) : (
                                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                )}
                              </div>

                              <div className="truncate font-mono text-gray-700">
                                {col.name}
                              </div>
                            </div>

                            {/* Type and Meta */}
                            <div className="flex items-center gap-2 pl-2 shrink-0">
                              {col.references && (
                                <span className="hidden group-hover:inline-block text-[9px] text-gray-400 bg-gray-100 px-1 rounded truncate max-w-20">
                                  → {col.references.split("(")[0]}
                                </span>
                              )}
                              <div className="flex items-center gap-1 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                                {getDataTypeIcon(col.type)}
                                <span className="text-[10px] text-gray-500 font-medium uppercase">
                                  {col.type.replace(/\(.*\)/, "")}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {!isOpen && schema.length > 0 && (
        <div className="flex items-center gap-2 mt-2">
          <div className="text-xs text-emerald-600 flex items-center gap-1 bg-emerald-50 w-fit px-2 py-1 rounded border border-emerald-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3 h-3"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
            Active scheme
          </div>
          <div className="text-[10px] text-gray-400">
            {parsedTables.length} tables detected
          </div>
        </div>
      )}
    </div>
  );
};

export default SchemaEditor;
