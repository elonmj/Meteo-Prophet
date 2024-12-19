type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  timestamp: string;
  level: LogLevel;
  [key: string]: any;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private formatMessage(level: LogLevel, message: string, context?: object): string {
    const timestamp = new Date().toISOString();
    const logContext: LogContext = {
      timestamp,
      level,
      ...context
    };

    if (this.isDevelopment) {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}\n${
        context ? JSON.stringify(context, null, 2) : ''
      }`;
    }

    return JSON.stringify({ message, ...logContext });
  }

  private shouldLog(level: LogLevel): boolean {
    if (this.isDevelopment) return true;
    if (level === 'error') return true;
    if (level === 'warn' && process.env.LOG_LEVEL !== 'error') return true;
    if (level === 'info' && process.env.LOG_LEVEL === 'debug') return true;
    return false;
  }

  debug(message: string, context?: object) {
    if (this.shouldLog('debug')) {
      console.debug(this.formatMessage('debug', message, context));
    }
  }

  info(message: string, context?: object) {
    if (this.shouldLog('info')) {
      console.info(this.formatMessage('info', message, context));
    }
  }

  warn(message: string, context?: object) {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', message, context));
    }
  }

  error(message: string, error: unknown, context?: object) {
    if (this.shouldLog('error')) {
      const errorContext = {
        ...(context || {}),
        error: error instanceof Error ? {
          name: error.name,
          message: error.message,
          stack: error.stack,
          cause: error.cause
        } : error
      };

      console.error(this.formatMessage('error', message, errorContext));

      // En production, on pourrait envoyer à un service externe
      if (!this.isDevelopment) {
        this.reportToService(message, errorContext);
      }
    }
  }

  private async reportToService(message: string, context: object) {
    // Exemple d'implémentation pour un service externe
    // À adapter selon vos besoins
    try {
      if (process.env.ERROR_REPORTING_URL) {
        await fetch(process.env.ERROR_REPORTING_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, context })
        });
      }
    } catch (e) {
      console.error('Failed to report error to service:', e);
    }
  }
}

const logger = new Logger();
export default logger;

// Fonction d'aide pour la gestion des erreurs
export function logError(message: string, error: unknown, context?: object) {
  logger.error(message, error, context);
}

// Fonction d'aide pour le débogage
export function logDebug(message: string, context?: object) {
  logger.debug(message, context);
}

// Fonction d'aide pour les infos
export function logInfo(message: string, context?: object) {
  logger.info(message, context);
}

// Fonction d'aide pour les avertissements
export function logWarn(message: string, context?: object) {
  logger.warn(message, context);
}
