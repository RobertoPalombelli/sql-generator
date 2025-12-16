import { useState } from 'react';
const ResultDisplay = ({sql,explanation,error}) => {
    const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (sql) {
      navigator.clipboard.writeText(sql);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!sql && !error) return null;
  return (
     <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-3">
        <label className="block text-sm font-semibold text-gray-700">
          Result
        </label>
        {sql && !error && (
          <button
            onClick={handleCopy}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
              ${copied 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-900'}
            `}
          >
            {copied ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
                Copy SQL
              </>
            )}
          </button>
        )}
      </div>

      {error ? (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-start gap-3">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 shrink-0 mt-0.5">
             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
           </svg>
           <p>{error}</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-linear-to-r from-primary-300 to-emerald-300 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-[#1e1e1e] ring-1 ring-white/10">
              <div className="flex items-center px-4 py-2 bg-[#2d2d2d] border-b border-[#404040]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <div className="ml-4 text-xs text-gray-400 font-mono">generated_query.sql</div>
              </div>
              <pre className="p-5 overflow-x-auto custom-scrollbar">
                <code className="font-mono text-sm sm:text-base text-[#d4d4d4] leading-relaxed block">
                  {sql?.split('\n').map((line, i) => (
                    <span key={i} className="block min-h-[1.5em]">
                      <span className="text-[#606060] inline-block w-8 select-none text-right mr-4 text-xs">{i + 1}</span>
                      {line}
                    </span>
                  ))}
                </code>
              </pre>
            </div>
          </div>

          {explanation && (
            <div className="bg-sky-50/50 border border-sky-100 rounded-xl p-4 flex gap-3 text-sm text-sky-900 shadow-sm ring-1 ring-sky-100/50">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 shrink-0 text-sky-600 mt-0.5">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
               </svg>
               <div>
                 <h4 className="font-semibold text-sky-700 mb-1">AI Description</h4>
                 <p className="leading-relaxed opacity-90">{explanation}</p>
               </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ResultDisplay