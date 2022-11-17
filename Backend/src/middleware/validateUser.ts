import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/httpException';

export const isValidUsername = (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body;

  if (!username || username === undefined) {
    throw new HttpException(400, '"username" is required')
  } 

  if (typeof username !== 'string') {
    throw new HttpException(422, '"username" must be a string')
  }

  if (username.length < 3) {
    throw new HttpException(422, '"username" length must be at least 3 characters long')
  }
  next();
};

export const isValidPassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  const regexPassword = /^(?=.*\d)(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/;
  if (!password || password === undefined) {
    throw new HttpException(400, '"password" is required')
  } 
  if (!regexPassword.test(password)) {
    throw new HttpException(400, '"password" length must be at least 8 characters long and contain uppercase letter and numbers')
  }
  next();
};

// https://acervolima.com/como-validar-uma-senha-usando-expressoes-regulares-em-java/