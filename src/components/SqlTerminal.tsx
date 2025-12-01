import { useState, useRef, useEffect } from 'react';
import { Terminal, Play, RotateCcw } from 'lucide-react';
import { createMockDatabase, executeSqlQuery, QueryResult } from '@/utils/sqlEngine';

export const SqlTerminal = () => {
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<{ query: string; result: QueryResult }[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Initialize with welcome message
    const welcomeResult: QueryResult = {
      success: true,
      data: [],
      message: `Welcome to Bhavana's SQL Terminal!
      
Available tables:
• projects - Project portfolio data
• skills - Technical skills and proficiencies
• experience - Work experience records
• education - Educational background
• certifications - Professional certifications

Try queries like:
SELECT * FROM projects;
SELECT name, proficiency FROM skills WHERE category = 'Languages';
SELECT company, role FROM experience ORDER BY start_date DESC;`,
      columns: []
    };
    setHistory([{ query: '-- WELCOME --', result: welcomeResult }]);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleExecute = () => {
    if (!query.trim()) return;

    setIsExecuting(true);
    
    // Simulate execution delay for realistic feel
    setTimeout(() => {
      const result = executeSqlQuery(query);
      setHistory(prev => [...prev, { query, result }]);
      setQuery('');
      setIsExecuting(false);
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleExecute();
    }
  };

  const handleClear = () => {
    setHistory([]);
    setQuery('');
  };

  const renderTable = (columns: string[], data: any[]) => {
    if (data.length === 0) return null;

    return (
      <div className="overflow-x-auto mt-2 -mx-3 sm:mx-0">
        <table className="w-full text-xs sm:text-sm border border-ink/20 min-w-[500px]">
          <thead>
            <tr className="bg-ink text-canvas">
              {columns.map((col, i) => (
                <th key={i} className="px-2 sm:px-3 py-1.5 sm:py-2 text-left font-mono font-semibold text-[10px] sm:text-xs uppercase">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-t border-ink/10 hover:bg-secondary/50 transition-colors">
                {columns.map((col, j) => (
                  <td key={j} className="px-2 sm:px-3 py-1.5 sm:py-2 font-mono text-[10px] sm:text-xs">
                    {typeof row[col] === 'object' ? JSON.stringify(row[col]) : String(row[col] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <section id="sql-terminal" className="section-padding bg-canvas">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8 reveal-slide-up">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <Terminal className="w-6 h-6 sm:w-8 sm:h-8 text-ink" />
              <h2 className="font-display font-bold text-ink text-3xl sm:text-4xl md:text-5xl">
                Interactive <span className="italic">SQL Terminal</span>
              </h2>
            </div>
            <p className="text-ink-60 text-base sm:text-lg">
              Query my portfolio data using real SQL. Try exploring projects, skills, experience, and more.
            </p>
          </div>

          {/* Terminal Container */}
          <div className="bg-ink text-canvas border-2 border-ink shadow-elegant reveal-scale">
            {/* Terminal Header */}
            <div className="bg-ink-90 px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between border-b border-canvas/20">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500" />
                <span className="ml-2 sm:ml-4 font-mono text-[10px] sm:text-xs text-canvas/70">portfolio_db@terminal</span>
              </div>
              <button
                onClick={handleClear}
                className="p-1 sm:p-1.5 hover:bg-canvas/10 rounded transition-colors"
                title="Clear terminal"
              >
                <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* Terminal Output */}
            <div
              ref={terminalRef}
              className="p-3 sm:p-4 h-[300px] sm:h-[350px] md:h-[400px] overflow-y-auto font-mono text-xs sm:text-sm space-y-3 sm:space-y-4 scrollbar-thin scrollbar-thumb-canvas/20 scrollbar-track-transparent"
            >
              {history.map((entry, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-start gap-1.5 sm:gap-2">
                    <span className="text-green-400 select-none text-xs sm:text-sm">$</span>
                    <pre className="text-canvas/90 whitespace-pre-wrap break-words flex-1 text-xs sm:text-sm">
                      {entry.query}
                    </pre>
                  </div>
                  
                  {entry.result.success ? (
                    <>
                      {entry.result.data && entry.result.data.length > 0 ? (
                        <>
                          {renderTable(entry.result.columns, entry.result.data)}
                          <div className="text-canvas/60 text-[10px] sm:text-xs mt-2">
                            {entry.result.data.length} row(s) returned
                          </div>
                        </>
                      ) : (
                        <pre className="text-canvas/70 whitespace-pre-wrap pl-3 sm:pl-4 text-xs sm:text-sm">
                          {entry.result.message}
                        </pre>
                      )}
                    </>
                  ) : (
                    <div className="text-red-400 pl-3 sm:pl-4 text-xs sm:text-sm">
                      ❌ Error: {entry.result.message}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Terminal Input */}
            <div className="border-t border-canvas/20 p-3 sm:p-4">
              <div className="flex items-start gap-1.5 sm:gap-2">
                <span className="text-green-400 mt-1.5 sm:mt-2 select-none text-xs sm:text-sm">$</span>
                <textarea
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your SQL query... (Ctrl/Cmd + Enter to execute)"
                  className="flex-1 bg-transparent text-canvas font-mono text-xs sm:text-sm resize-none outline-none placeholder-canvas/40 min-h-[50px] sm:min-h-[60px]"
                  rows={3}
                  disabled={isExecuting}
                />
                <button
                  onClick={handleExecute}
                  disabled={isExecuting || !query.trim()}
                  className="mt-0.5 sm:mt-1 p-1.5 sm:p-2 bg-canvas text-ink hover:bg-canvas/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex-shrink-0"
                  title="Execute query (Ctrl/Cmd + Enter)"
                >
                  <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
              <div className="mt-2 text-[10px] sm:text-xs text-canvas/50">
                Press <kbd className="px-1 sm:px-1.5 py-0.5 bg-canvas/10 rounded text-[9px] sm:text-[10px]">Ctrl/Cmd + Enter</kbd> to execute
              </div>
            </div>
          </div>

          {/* Quick Examples */}
          <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
            {[
              'SELECT * FROM projects;',
              'SELECT name, proficiency FROM skills WHERE proficiency > 85;',
              'SELECT role, company FROM experience;',
            ].map((example, i) => (
              <button
                key={i}
                onClick={() => setQuery(example)}
                className="px-3 sm:px-4 py-2 bg-secondary hover:bg-ink hover:text-canvas text-left font-mono text-[10px] sm:text-xs transition-all border border-border"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};