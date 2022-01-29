import { NextFunction, Request, Response } from 'express';
import CustomError from '@/error/custom-error';

// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  }
  const { status, errorMessage } = err;
  res.status(status).json({ errorMessage });
};

export default errorMiddleware;
