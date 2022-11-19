import { PrismaClient } from '@prisma/client';
import HttpException from '../utils/httpException';

const prisma = new PrismaClient()

const getBalance = async (id: number) => {
    const accountExist = await prisma.accounts.findFirst({
        where: {
            id,
        },
    });

    if (!accountExist) {
        throw new HttpException(404, 'Account not found')
        
    }
    return Number(accountExist.balance);
}

const deposit =async (value:number, id: number) => {
    const oldbalance = await getBalance(id);
    const newBalance = value + Number(oldbalance);
    await prisma.accounts.update({
        where: {
            id,
        },
        data: {
            balance: newBalance
        }
    })
    return newBalance
}

export default {getBalance, deposit}