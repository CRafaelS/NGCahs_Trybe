import jwt, { SignOptions } from 'jsonwebtoken';
import { IClient } from '../Interfaces/client.interface';
import { IJWT } from '../Interfaces/jwt.interce';
import HttpException from './httpException';

const SECRET = process.env.SECRET || "mysecret";

const jwtDefaultConfig: SignOptions = {
    expiresIn: '24h',
    algorithm: 'HS256',
}

export const generateJWTToken = (payload: Omit< IClient, 'password'>):string =>
  jwt.sign(payload, SECRET, jwtDefaultConfig);

export const authenticateToken = (token: string):IJWT => {
  try {
    const validate = jwt.verify(token, SECRET);
    return validate as IJWT;
  } catch (error) {
    throw new HttpException(401, 'Expired or invalid token');
  }
};