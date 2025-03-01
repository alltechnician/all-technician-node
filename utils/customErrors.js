class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  class NotFoundError extends AppError {
    constructor(message = "Resource not found") {
      super(message, 404);
    }
  }
  
  class ValidationError extends AppError {
    constructor(message = "Validation error") {
      super(message, 422);
    }
  }
  
  class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized access") {
      super(message, 401);
    }
  }
  
  class ForbiddenError extends AppError {
    constructor(message = "Forbidden access") {
      super(message, 403);
    }
  }
  
  class ConflictError extends AppError {
    constructor(message = "Conflict error") {
      super(message, 409);
    }
  }
  
  class InternalServerError extends AppError {
    constructor(message = "Internal server error") {
      super(message, 500);
    }
  }
  
  module.exports = {
    AppError,
    NotFoundError,
    ValidationError,
    UnauthorizedError,
    ForbiddenError,
    ConflictError,
    InternalServerError,
  };
  