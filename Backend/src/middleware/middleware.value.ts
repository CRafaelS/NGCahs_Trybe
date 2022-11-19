import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/httpException';

export const isValidValue = (req: Request, res: Response, next: NextFunction) => {
  const { value } = req.body;

  if (!value || value === undefined) {
    throw new HttpException(400, '"username" is required')
  } 

  if (typeof value !== 'number') {
    throw new HttpException(422, '"username" must be a number')
  }

  if (value < 0) {
    throw new HttpException(422, '"value" must be at greater than 0')
  }
  next();
};
