import { useState } from "react";

const HistoryDrawer = ({isOpen,onClose,history,onSelect,onToggleSave,onDelete}) => {
    const [filter, setFilter] = useState('all');
    
    const filteredHistory = filter === 'all' ? history : history.filter(item => item.isSaved);
    
    const formatDate = (ts) => {
    return new Intl.DateTimeFormat('it-IT', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(ts));
  };
  return (
     <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        />
      )}

     
      <div className={`
        fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-primary-50/30">
            <h2 className="text-xl font-bold text-gray-800">Cronologia</h2>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex p-2 gap-2 border-b border-gray-100">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-colors ${filter === 'all' ? 'bg-primary-100 text-primary-700' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('saved')}
              className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-colors ${filter === 'saved' ? 'bg-amber-100 text-amber-700' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              Saved
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
            {filteredHistory.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto mb-3 opacity-30">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>No queries found.</p>
              </div>
            ) : (
              filteredHistory.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-[10px] font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {item.dialect}
                    </span>
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={(e) => { e.stopPropagation(); onToggleSave(item.id); }}
                        className={`p-1 rounded-md transition-colors ${item.isSaved ? 'text-amber-400 hover:text-amber-500' : 'text-gray-300 hover:text-amber-400'}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                          <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
                        className="p-1 text-gray-300 hover:text-red-400 rounded-md transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                          <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-800 font-medium mb-2 line-clamp-2" title={item.naturalQuery}>
                    {item.naturalQuery}
                  </p>
                  
                  <div className="text-[10px] text-gray-400 mb-3 font-mono bg-gray-50 p-1.5 rounded truncate">
                    {item.generatedSql}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-gray-400">{formatDate(item.timestamp)}</span>
                    <button 
                      onClick={() => {
                        onSelect(item);
                        onClose();
                      }}
                      className="text-xs text-primary-600 font-semibold hover:text-primary-700 hover:underline flex items-center gap-1"
                    >
                      Upload
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default HistoryDrawer