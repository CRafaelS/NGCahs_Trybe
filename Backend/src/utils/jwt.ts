import jwt, { SignOptions } from 'jsonwebtoken';
import { IClient } from '../Interfaces/client.interface';


const SECRET = process.env.SECRET || "mysecret";

const jwtDefaultConfig: SignOptions = {
    expiresIn: '24h',
    algorithm: 'HS256',
}

export const generateJWTToken = (payload: Omit< IClient, 'password'>):string =>
  jwt.sign(payload, SECRET, jwtDefaultConfig);