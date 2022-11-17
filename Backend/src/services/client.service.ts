import { PrismaClient } from '@prisma/client';
import HttpException from '../utils/httpException';
import { IClient } from '../Interfaces/client.interface';
import {Md5} from "md5-typescript";

const prisma = new PrismaClient()

const createClient = async (username: string, password: string):Promise<IClient> => {
    const encrypted = Md5.init(password);

    const emailExist = await prisma.users.findFirst({
        where: {
            username,
        },
    });

    if (emailExist) {
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

export default createClient