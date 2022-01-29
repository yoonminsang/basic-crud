/**
 * custom error
 * @param {number} status - http status code
 * @param {string} errorMessage - error message for developer
 * @param {string} customMessage - custom error message  ex) joi
 * @return {CustomError} - custom error object
 */

interface IParams {
  status: number;
  errorMessage: string;
  customMessage?: string;
}

class CustomError extends Error {
  status: number;

  errorMessage: string;

  customMessage?: string;

  constructor({ status, errorMessage, customMessage }: IParams) {
    super(errorMessage);

    Error.captureStackTrace(this, this.constructor);

    this.status = status;
    this.errorMessage = errorMessage;
    this.customMessage = customMessage;
  }
}

export default CustomError;
