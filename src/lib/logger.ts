import config from './config';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/**
 * Logger utility that respects environment log level settings
 */
class Logger {
  private logLevel: unknown;
  private readonly logLevelPriority: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
  };

  constructor() {
    // Check for log level override in localStorage
    if (typeof window !== 'undefined') {
      try {
        const logLevelOverride = localStorage.getItem('log_level_override');
        if (logLevelOverride && this.isValidLogLevel(logLevelOverride)) {
          console.log(`Using log level override from localStorage: ${logLevelOverride}`);
          this.logLevel = logLevelOverride;
          return;
        }
      } catch (_error) {
        console.error('Error getting log level override from localStorage:', _error);
        // Ignore localStorage errors (might happen in test contexts)
      }
    }
    
    // Get log level from config, default to environment-specific levels
    const configLogLevel = config.logLevel;
    this.logLevel = this.isValidLogLevel(configLogLevel) 
      ? configLogLevel 
      : this.getDefaultLogLevel();
    
    // In development, we print the logger initialization
    if (config.env === 'development') {
      console.log(`[Logger] Initialized with log level: ${this.logLevel}`);
    }
  }

  /**
   * Check if a string is a valid log level
   */
  private isValidLogLevel(level: string): level is LogLevel {
    return ['debug', 'info', 'warn', 'error'].includes(level);
  }

  /**
   * Get default log level based on environment
   */
  private getDefaultLogLevel(): LogLevel {
    switch(config.env) {
      case 'development':
        return 'debug';
      case 'test':
        return 'info';
      case 'production':
        return 'error';
      default:
        return 'info';
    }
  }

  /**
   * Check if a log level should be displayed
   */
  private shouldLog(level: LogLevel): boolean {
    return this.logLevelPriority[level] >= this.logLevelPriority[this.logLevel as LogLevel];
  }

  /**
   * Format log for consistent output
   */
  private formatLog(level: LogLevel, message: string, data?: unknown): string {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
    return data ? `${prefix} ${message} ${JSON.stringify(data)}` : `${prefix} ${message}`;
  }

  /**
   * Debug level logging
   */
  debug(message: string, data?: unknown): void {
    if (this.shouldLog('debug')) {
      console.log(this.formatLog('debug', message, data));
    }
  }

  /**
   * Info level logging
   */
  info(message: string, data?: unknown): void {
    if (this.shouldLog('info')) {
      console.info(this.formatLog('info', message, data));
    }
  }

  /**
   * Warning level logging
   */
  warn(message: string, data?: unknown): void {
    if (this.shouldLog('warn')) {
      console.warn(this.formatLog('warn', message, data));
    }
  }

  /**
   * Error level logging
   */
  error(message: string, error?: Error | unknown): void {
    if (this.shouldLog('error')) {
      console.error(this.formatLog('error', message, error));
      
      // In development, we also log the stack trace if available
      if (config.env === 'development' && error instanceof Error && error.stack) {
        console.error(error.stack);
      }
    }
  }

  /**
   * Log API request (useful for development)
   */
  logApiRequest(method: string, url: string, body?: unknown): void {
    if (config.env === 'development') {
      this.debug(`API Request: ${method} ${url}`, body);
    }
  }

  /**
   * Log API response (useful for development)
   */
  logApiResponse(method: string, url: string, status: number, body?: unknown): void {
    if (config.env === 'development') {
      this.debug(`API Response: ${method} ${url} (${status})`, body);
    }
  }
}

// Create a singleton instance
const logger = new Logger();

export default logger; 