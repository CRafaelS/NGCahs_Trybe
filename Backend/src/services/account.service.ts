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
    return accountExist.balance;
}

export default getBalance