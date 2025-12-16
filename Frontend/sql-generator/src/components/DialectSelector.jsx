import { DIALECTS } from "../sqlDialect"
const DialectSelector = ({selectedDialect,onSelect}) => {
  return (
   <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        1. Select SQL Dialect
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {DIALECTS.map((dialect) => (
          <button
            key={dialect.value}
            onClick={() => onSelect(dialect.value)}
            className={`
              flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200
              hover:shadow-md active:scale-95 cursor-pointer
              ${selectedDialect === dialect.value
                ? 'bg-primary-50 border-primary-500 text-primary-700 shadow-sm ring-1 ring-primary-500' 
                : 'bg-white border-gray-200 text-gray-600 hover:border-primary-300 hover:bg-primary-50/50'}
            `}
          >
            <span className="text-2xl mb-1 filter drop-shadow-sm">{dialect.icon}</span>
            <span className="text-xs font-medium">{dialect.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default DialectSelector