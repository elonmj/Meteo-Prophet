/* eslint-disable no-unused-vars */
import {logError} from '@/core/utils/logger';
import {NextApiRequest, NextApiResponse} from 'next';

// Types personnalisés pour une meilleure gestion des erreurs
interface ApiError extends Error {
  statusCode?: number;
  code?: string;
  errors?: Record<string, string[]>;
}

// Énumération des codes d'erreur courants
export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}

// Classe de base pour les erreurs API
export class BaseApiError extends Error implements ApiError {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code: string = ErrorCode.INTERNAL_ERROR,
    public errors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Erreurs spécifiques
export class ValidationError extends BaseApiError {
  constructor(message: string, errors?: Record<string, string[]>) {
    super(message, 400, ErrorCode.VALIDATION_ERROR, errors);
  }
}

export class UnauthorizedError extends BaseApiError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401, ErrorCode.UNAUTHORIZED);
  }
}

export class ForbiddenError extends BaseApiError {
  constructor(message: string = 'Forbidden') {
    super(message, 403, ErrorCode.FORBIDDEN);
  }
}

export class NotFoundError extends BaseApiError {
  constructor(message: string = 'Resource not found') {
    super(message, 404, ErrorCode.NOT_FOUND);
  }
}

export class ConflictError extends BaseApiError {
  constructor(message: string) {
    super(message, 409, ErrorCode.CONFLICT);
  }
}

// Type de fonction pour le handler
type ApiHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void;

// Middleware amélioré
export function errorMiddleware(handler: ApiHandler): ApiHandler {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // // Vérifie si la réponse a déjà été envoyée
      // const originalEnd = res.end;
      // let responseEnded = false;

      // res.end = function(...args) {
      //   responseEnded = true;
      //   return originalEnd.apply(res, args);
      // };

      // Support des handlers synchrones et asynchrones
      await Promise.resolve(handler(req, res));

      // // Vérifie si un gestionnaire a oublié d'envoyer une réponse
      // if (!responseEnded && !res.writableEnded) {
      //   throw new Error('Response was not sent by handler');
      // }
    } catch (error) {
      // Évite d'envoyer plusieurs réponses
      if (res.writableEnded) {
        logError(
          "⚠️ Attention: Tentative d'envoi d'une réponse après que la réponse initiale ait été envoyée",
          error,
        );
        return;
      }

      logError('⛔️ API error:', error);

      // Traitement des différents types d'erreur
      if (error instanceof BaseApiError) {
        // Erreurs API personnalisées
        return res.status(error.statusCode).json({
          code: error.code,
          message: error.message,
          ...(error.errors && {errors: error.errors}),
        });
      } else if (error instanceof Error) {
        // Erreurs JavaScript standard
        return res.status(500).json({
          code: ErrorCode.INTERNAL_ERROR,
          message:
            process.env.NODE_ENV === 'production'
              ? 'An internal server error occurred'
              : error.message,
        });
      } else {
        // Erreurs inconnues
        return res.status(500).json({
          code: ErrorCode.INTERNAL_ERROR,
          message: 'An unexpected error occurred',
        });
      }
    }
  };
}

// Utilitaire pour vérifier les méthodes HTTP
export const allowedMethods =
  (methods: string[]) =>
  (handler: ApiHandler): ApiHandler => {
    return async (req, res) => {
      if (!methods.includes(req.method!)) {
        throw new BaseApiError(`Method ${req.method} not allowed`, 405, 'METHOD_NOT_ALLOWED');
      }
      return handler(req, res);
    };
  };
