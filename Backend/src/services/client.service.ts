import { PrismaClient } from '@prisma/client';
import HttpException from '../utils/httpException';
import { IClient } from '../Interfaces/client.interface';
import {Md5} from "md5-typescript";
import { generateJWTToken } from '../utils/jwt';

const prisma = new PrismaClient()

const createClient = async (username: string, password: string):Promise<IClient> => {
    const encrypted = Md5.init(password);

    const clientExist = await prisma.users.findFirst({
        where: {
            username,
        },
    });

    if (clientExist) {
        throw new HttpException(409, 'User already exists')
        
    }
    const createdNewClient = await prisma.$transaction(async(prisma) => {
        const accountData = await prisma.accounts.create({
            data:{
                balance: 100.00
            }
        })

        const newUser = await prisma.users.create({
            data: {
                username,
                password: encrypted,
                accountsId: accountData.id
            }
        })
        return newUser
    })
    return createdNewClient;
}

const authClient = async (username: string, password: string) => {
    const encrypted = Md5.init(password);

    const findClient = await prisma.users.findFirst({
        where: {
            username, password: encrypted
        },
    });

    if (!findClient) {
        throw new HttpException(404, 'wrong email or password ') 
    }
    const token = generateJWTToken(findClient);
    return token;
}

export default {createClient, authClient}