import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/httpException';
import { authenticateToken } from '../utils/jwt';

export const isValidUsername = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        throw new HttpException(401, 'Token not found');
      }
    res.locals.id = authenticateToken(token).accountsId;
  next();
}  