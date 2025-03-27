'use client';

import { useState } from 'react';
import logger from '@/lib/logger';
import { Button } from '@/components/ui/button';
import LogLevelDisplay from './components/LogLevelDisplay';

export default function LoggingExamplePage() {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, `${Date.now()}-${message}`]);
  };

  const handleDebugLog = () => {
    const message = 'This is a debug message';
    logger.debug(message, { source: 'LoggingExamplePage' });
    addLog(`DEBUG: ${message}`);
  };

  const handleInfoLog = () => {
    const message = 'This is an info message';
    logger.info(message);
    addLog(`INFO: ${message}`);
  };

  const handleWarnLog = () => {
    const message = 'This is a warning message';
    logger.warn(message);
    addLog(`WARN: ${message}`);
  };

  const handleErrorLog = () => {
    const message = 'This is an error message';
    const error = new Error('Example error');
    logger.error(message, error);
    addLog(`ERROR: ${message}`);
  };

  const handleApiRequestLog = () => {
    const url = '/api/examples/test';
    const method = 'GET';
    const body = { test: 'data' };
    
    logger.logApiRequest(method, url, body);
    addLog(`API REQUEST: ${method} ${url}`);
  };

  const handleApiResponseLog = () => {
    const url = '/api/examples/test';
    const method = 'GET';
    const status = 200;
    const body = { success: true, data: { id: 123, name: 'Test' } };
    
    logger.logApiResponse(method, url, status, body);
    addLog(`API RESPONSE: ${status} ${method} ${url}`);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Logging Examples</h1>
      
      <div className="mb-8">
        <div className="bg-blue-50 p-4 rounded-md mb-6 border border-blue-100">
          <h2 className="text-lg font-semibold mb-2">How to Use This Page</h2>
          <p className="mb-2">
            This page demonstrates the logging system. Follow these steps:
          </p>
          <ol className="list-decimal list-inside space-y-1 mb-2">
            <li>Open your browser console (F12 or Cmd+Option+J)</li>
            <li>Click the buttons below to generate different types of logs</li>
            <li>Watch the console to see how logs appear differently based on their level</li>
            <li>Use the log level controls below to change which logs are visible</li>
          </ol>
          <p className="text-sm text-blue-700 mt-2">
            <strong>Tip:</strong> Try changing the log level to see how it affects which logs are displayed in the console.
          </p>
        </div>
        
        <p className="mb-4">
          Click the buttons below to trigger different types of logs.
          Check your browser console to see the actual log output.
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Button onClick={handleDebugLog}>Debug Log</Button>
          <Button variant="secondary" onClick={handleInfoLog}>Info Log</Button>
          <Button variant="outline" onClick={handleWarnLog}>Warning Log</Button>
          <Button variant="destructive" onClick={handleErrorLog}>Error Log</Button>
          <Button variant="secondary" onClick={handleApiRequestLog}>API Request Log</Button>
          <Button variant="secondary" onClick={handleApiResponseLog}>API Response Log</Button>
          <Button variant="ghost" onClick={clearLogs}>Clear Log History</Button>
        </div>
        
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Log History</h2>
          <p className="text-sm mb-2">
            This shows what was logged. Open your browser console to see the actual formatted logs.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-md h-80 overflow-y-auto font-mono text-sm">
            {logs.length === 0 ? (
              <p className="text-gray-500">No logs yet. Click a button above to generate logs.</p>
            ) : (
              logs.map((log) => {
                const [timestamp, message] = log.split('-', 2); 
                return (
                  <div key={timestamp} className="mb-1">
                    {message}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      
      <LogLevelDisplay />
      
      <div className="mt-10 p-4 bg-blue-50 rounded-md">
        <h2 className="text-xl font-semibold mb-2">About the Logger</h2>
        <p className="mb-2">
          The logger automatically adjusts its behavior based on the current environment:
        </p>
        <ul className="list-disc list-inside space-y-1 mb-4">
          <li><strong>Development:</strong> All logs (debug, info, warn, error) are displayed</li>
          <li><strong>Test:</strong> Only info, warn, and error logs are displayed</li>
          <li><strong>Production:</strong> Only error logs are displayed</li>
        </ul>
        <p>
          To see all logs in any environment, you can run the application with <code>npm run dev:verbose</code> or set <code>LOG_LEVEL=debug</code>.
        </p>
      </div>
    </div>
  );
} 