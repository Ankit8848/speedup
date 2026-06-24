/**
 * Lightweight HTTP error carrying a status code. Thrown from route handlers
 * and translated into a JSON response by the error-handling middleware.
 */
export class HttpError extends Error {
  readonly status: number;
  readonly details?: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.details = details;
  }

  static notFound(message = "Resource not found"): HttpError {
    return new HttpError(404, message);
  }

  static badRequest(message = "Bad request", details?: unknown): HttpError {
    return new HttpError(400, message, details);
  }

  static unauthorized(message = "Authentication required"): HttpError {
    return new HttpError(401, message);
  }

  static forbidden(message = "You do not have access to this resource"): HttpError {
    return new HttpError(403, message);
  }

  static conflict(message = "Resource already exists"): HttpError {
    return new HttpError(409, message);
  }
}
