
const Header = ({onOpenHistory}) => {
  return (
    <header className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center justify-center sm:justify-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
          </svg>
        </div>
        <div>
           <h1 className="text-3xl font-bold text-gray-800 tracking-tight leading-none">
            SQL <span className="text-primary-600">Generator</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">Natural AI to SQL Converter</p>
        </div>
      </div>
      
      <button 
        onClick={onOpenHistory} 
        className="group flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-primary-300 hover:text-primary-600 transition-all active:scale-95"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 group-hover:text-primary-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="font-medium text-sm text-gray-700 group-hover:text-primary-700">History</span>
      </button>
    </header>
  )
}

export default Header