'use client';

import { Table } from '@radix-ui/themes';
import { Button } from '@/components/ui/button';
import config from '@/lib/config';
import { useState, useEffect } from 'react';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

// Function to check if a log level would be visible
const isLogVisible = (
  levelToCheck: LogLevel,
  environmentLogLevel: LogLevel
): boolean => {
  const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
  const envIndex = levels.indexOf(environmentLogLevel);
  const checkIndex = levels.indexOf(levelToCheck);
  
  return checkIndex >= envIndex;
};

export default function LogLevelDisplay() {
  const [currentEnv, setCurrentEnv] = useState('');
  const [currentLogLevel, setCurrentLogLevel] = useState<LogLevel>('debug');
  
  useEffect(() => {
    setCurrentEnv(config.env);
    // Safely cast the log level to the LogLevel type
    const configLogLevel = config.logLevel;
    if (isValidLogLevel(configLogLevel)) {
      setCurrentLogLevel(configLogLevel);
    } else {
      // Default to 'debug' if the config.logLevel is not a valid LogLevel
      setCurrentLogLevel('debug');
      console.warn(`Invalid log level in config: ${configLogLevel}, defaulting to 'debug'`);
    }
  }, []);
  
  // Helper function to validate log level
  const isValidLogLevel = (level: string): level is LogLevel => {
    return ['debug', 'info', 'warn', 'error'].includes(level);
  };
  
  const environments = [
    { name: 'Development', defaultLevel: 'debug' as LogLevel },
    { name: 'Test', defaultLevel: 'info' as LogLevel },
    { name: 'Production', defaultLevel: 'error' as LogLevel },
  ];
  
  const logLevels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
  
  const changeLogLevel = (level: LogLevel) => {
    // This would typically require a server-side change
    // But for demo purposes, let's update the local state
    setCurrentLogLevel(level);
    
    // In a real implementation, we would update localStorage
    // or call an API to change the log level
    if (typeof window !== 'undefined') {
      localStorage.setItem('log_level_override', level);
      alert(`Log level changed to ${level}. In a real application, this would update the server configuration.`);
    }
  };
  
  return (
    <div className="mt-8 mb-8">
      <h2 className="text-xl font-semibold mb-4">Log Level Visibility</h2>
      
      <div className="mb-4">
        <div className="p-4 bg-gray-50 rounded-md mb-4 border">
          <p className="font-medium">
            <strong>Current Environment:</strong> <span className="text-blue-600">{currentEnv}</span> with log level{' '}
            <code className="px-1 py-0.5 bg-gray-100 rounded text-purple-600 font-semibold">{currentLogLevel}</code>
          </p>
          
          <p className="mt-2 text-sm text-gray-600">
            With the current log level, the following log types are {' '}
            <span className="text-green-500 font-medium">visible</span>:{' '}
            {logLevels
              .filter(level => isLogVisible(level, currentLogLevel))
              .map(level => (
                <span key={level} className="inline-flex items-center mx-1 px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium capitalize">
                  {level}
                </span>
              ))}
          </p>
        </div>
        
        <div className="mt-3">
          <p className="mb-1 text-sm text-gray-700">Set log level:</p>
          <div className="flex flex-wrap gap-2">
            {logLevels.map(level => (
              <Button 
                key={level}
                variant={currentLogLevel === level ? 'default' : 'outline'}
                size="sm"
                onClick={() => changeLogLevel(level)}
                className="capitalize"
              >
                {level}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Log Level</Table.ColumnHeaderCell>
            {environments.map((env) => (
              <Table.ColumnHeaderCell key={env.name}>
                {env.name}
              </Table.ColumnHeaderCell>
            ))}
            <Table.ColumnHeaderCell>Current</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        
        <Table.Body>
          {logLevels.map((level) => (
            <Table.Row key={level}>
              <Table.Cell className="font-semibold capitalize">
                {level}
              </Table.Cell>
              
              {environments.map((env) => (
                <Table.Cell key={`${level}-${env.name}`}>
                  {isLogVisible(level, env.defaultLevel) ? (
                    <span className="text-green-500">✓ Visible</span>
                  ) : (
                    <span className="text-red-500">✗ Hidden</span>
                  )}
                </Table.Cell>
              ))}
              
              <Table.Cell>
                {isLogVisible(level, currentLogLevel) ? (
                  <span className="text-green-500 font-bold">✓ VISIBLE</span>
                ) : (
                  <span className="text-red-500 font-bold">✗ HIDDEN</span>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      
      <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
        <p className="text-sm">
          <strong>Note:</strong> You can override the default log level by:
        </p>
        <ul className="list-disc list-inside text-sm mt-1">
          <li>
            Running <code className="px-1 py-0.5 bg-gray-100 rounded">npm run dev:verbose</code> to see all logs
          </li>
          <li>
            Setting <code className="px-1 py-0.5 bg-gray-100 rounded">LOG_LEVEL=debug</code> in your environment file
          </li>
          <li>
            Adding <code className="px-1 py-0.5 bg-gray-100 rounded">LOG_LEVEL=debug</code> when running a command:{' '}
            <code className="px-1 py-0.5 bg-gray-100 rounded">LOG_LEVEL=debug npm run dev</code>
          </li>
        </ul>
      </div>
    </div>
  );
} 