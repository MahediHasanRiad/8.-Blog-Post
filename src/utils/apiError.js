class apiError extends Error {
  constructor(code, message = "something went wrong !!!", errors = [], stack) {
    super(message);
    this.success = false;
    this.code = code;
    this.message = message;
    this.errors = errors, 
    this.stack = " ",
    this.data = null

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { apiError };
