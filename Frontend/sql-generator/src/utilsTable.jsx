export const PLACEHOLDER_SCHEMA = `CREATE TABLE users (
  id INT PRIMARY KEY,
  username VARCHAR(50),
  email VARCHAR(100),
  created_at TIMESTAMP
);

CREATE TABLE orders (
  id INT PRIMARY KEY,
  user_id INT,
  total DECIMAL(10, 2),
  FOREIGN KEY (user_id) REFERENCES users(id)
);`;

export const getDataTypeIcon = (type) => {
  const t = type.toUpperCase();
  if (t.includes('INT') || t.includes('DECIMAL') || t.includes('FLOAT') || t.includes('NUMERIC') || t.includes('DOUBLE')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-blue-500">
        <title>Numero</title>
        <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
        <path d="M10 5.5a.5.5 0 01.5.5v1.5h1.5a.5.5 0 010 1h-1.5v1.5a.5.5 0 01-1 0v-1.5h-1.5a.5.5 0 010-1h1.5v-1.5a.5.5 0 01.5-.5z" /> 
        {/* Abstract representation of number/hash */}
        <path fillRule="evenodd" d="M3.5 10a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z" clipRule="evenodd" className="opacity-0" /> {/* Spacer */}
        <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="10" fontWeight="bold" fill="currentColor">#</text>
      </svg>
    );
  }
  if (t.includes('CHAR') || t.includes('TEXT') || t.includes('STRING')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-orange-500">
        <title>Testo</title>
        <path fillRule="evenodd" d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 001.075.676L10 15.082l5.925 2.844A.75.75 0 0017 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0010 2z" clipRule="evenodd" />
        <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="10" fontWeight="bold" fill="white">T</text>
      </svg>
    );
  }
  if (t.includes('DATE') || t.includes('TIME') || t.includes('YEAR')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-purple-500">
        <title>Data/Ora</title>
        <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
      </svg>
    );
  }
  if (t.includes('BOOL') || t.includes('BIT')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-gray-500">
        <title>Booleano</title>
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    );
  }
  // Default/Other
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-gray-400">
      <title>Generico</title>
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
  );
}


export const parseSchemaComplex = (ddl)=> {
  const tables = [];
  const cleanDDL = ddl
    .replace(/--.*$/gm, '') 
    .replace(/\/\*[\s\S]*?\*\//g, '') 
    .replace(/\s+/g, ' ');

  const tableBlockRegex = /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(?:[\w"]+\.)?["`]?(\w+)["`]?\s*\(([\s\S]*?)\);/gi;

  let match;
  while ((match = tableBlockRegex.exec(cleanDDL)) !== null) {
    const tableName = match[1];
    const body = match[2];
    
    const columns= [];
    const tableConstraints= [];

    const safeBody = body.replace(/\(([^)]+)\)/g, (m) => m.replace(/,/g, '__COMMA__'));    
    const statements = safeBody.split(',').map(s => s.trim()).filter(s => s.length > 0);

    statements.forEach(stmt => {
      const line = stmt.replace(/__COMMA__/g, ','); 
      const upperLine = line.toUpperCase();
      if (upperLine.startsWith('PRIMARY KEY')) {
        const matchPK = line.match(/PRIMARY\s+KEY\s*\(([^)]+)\)/i);
        if (matchPK) {
          const cols = matchPK[1].split(',').map(c => c.trim().replace(/["`]/g, ''));
          tableConstraints.push({ type: 'PK', cols });
        }
      } else if (upperLine.startsWith('FOREIGN KEY') || (upperLine.startsWith('CONSTRAINT') && upperLine.includes('FOREIGN KEY'))) {
         const matchFK = line.match(/FOREIGN\s+KEY\s*\(([^)]+)\)\s*REFERENCES\s+([^\s(]+)(?:\(([^)]+)\))?/i);
         if (matchFK) {
           const cols = matchFK[1].split(',').map(c => c.trim().replace(/["`]/g, ''));
           const refTable = matchFK[2].replace(/["`]/g, '');
           const refCol = matchFK[3] ? matchFK[3].replace(/["`]/g, '') : ''; 
           tableConstraints.push({ type: 'FK', cols, ref: `${refTable}${refCol ? `(${refCol})` : ''}` });
         }
      } else if (!upperLine.startsWith('CONSTRAINT') && !upperLine.startsWith('KEY') && !upperLine.startsWith('INDEX') && !upperLine.startsWith('UNIQUE')) {
        const parts = line.split(/\s+/);
        const colName = parts[0].replace(/["`]/g, '');
        const colType = parts[1] + (parts[2] && parts[2].startsWith('(') ? parts[2] : '');
        const isInlinePK = upperLine.includes('PRIMARY KEY');
        const isInlineFK = upperLine.includes('REFERENCES');
        let ref = undefined;
        
        if (isInlineFK) {
             const matchRef = line.match(/REFERENCES\s+([^\s(]+)(?:\(([^)]+)\))?/i);
             if (matchRef) {
                const refTable = matchRef[1].replace(/["`]/g, '');
                const refCol = matchRef[2] ? matchRef[2].replace(/["`]/g, '') : '';
                ref = `${refTable}${refCol ? `(${refCol})` : ''}`;
             }
        }

        columns.push({
          name: colName,
          type: colType,
          isPrimaryKey: isInlinePK,
          isForeignKey: isInlineFK,
          references: ref
        });
      }
    });

    tableConstraints.forEach(tc => {
      tc.cols.forEach(colName => {
        const col = columns.find(c => c.name === colName);
        if (col) {
          if (tc.type === 'PK') col.isPrimaryKey = true;
          if (tc.type === 'FK') {
             col.isForeignKey = true;
             col.references = tc.ref;
          }
        }
      });
    });

    tables.push({ name: tableName, columns });
  }
  return tables;
};