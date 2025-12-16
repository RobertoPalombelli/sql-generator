
const SUGGESTIONS = [
  "Users registered in the last week",
  "Total sales by category in 2025",
  "Top 5 customers with the most orders",
  "Average product prices per supplier"
];

const QueryInput = ({value,onChange,onGenerate,isLoading}) => {
    const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      onGenerate();
    }
  };
  return (
   <div className="mb-8">
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        3. Describe your request in natural language
      </label>
      <div className="relative shadow-lg rounded-2xl bg-white mb-3">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Example: Find all users who spent more than €100 in the last month, sorted by total spend in descending order..."
          className="w-full min-h-30 p-5 pr-32 bg-white text-gray-800 rounded-2xl border-0 ring-1 ring-gray-200 focus:ring-2 focus:ring-primary-400 outline-none resize-none text-base placeholder:text-gray-400 transition-shadow"
        />
        <div className="absolute bottom-4 right-4">
          <button
            onClick={onGenerate}
            disabled={!value.trim() || isLoading}
            className={`
              flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-white shadow-md transition-all duration-300
              ${!value.trim() || isLoading 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-linear-to-r from-primary-400 to-primary-600 hover:from-primary-500 hover:to-primary-700 hover:shadow-primary-200/50 hover:-translate-y-0.5 active:translate-y-0'}
            `}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              <>
                <span>Generate SQL</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-gray-500">Prova:</span>
          {SUGGESTIONS.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onChange(suggestion)}
              className="text-xs px-2.5 py-1 bg-white border border-gray-200 text-gray-600 rounded-lg hover:border-primary-400 hover:text-primary-700 hover:shadow-sm transition-all duration-200 active:scale-95"
            >
              {suggestion}
            </button>
          ))}
        </div>
        
        <p className="text-xs text-gray-400 whitespace-nowrap ml-auto">
          Tips: <kbd className="font-sans px-1 py-0.5 rounded bg-gray-100 border border-gray-300">Ctrl</kbd> + <kbd className="font-sans px-1 py-0.5 rounded bg-gray-100 border border-gray-300">Enter</kbd>
        </p>
      </div>
    </div>
  )
}

export default QueryInput