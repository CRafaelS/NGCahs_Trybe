import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/httpException';

export const isValidType = (req: Request, res: Response, next: NextFunction) => {
  const { type } = req.body;

  if (!type || type === undefined) {
    throw new HttpException(400, '"type" is required')
  } 

  if (typeof type !== 'string') {
    throw new HttpException(422, '"type" must be a string')
  }
  next();
};