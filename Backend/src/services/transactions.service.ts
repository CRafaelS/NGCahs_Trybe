import { PrismaClient } from '@prisma/client';
import HttpException from '../utils/httpException';
import accountService from './account.service';

const prisma = new PrismaClient()

const cashOut = async (username:string, value: number ,id: number) => {
    const mybalance = Number(await accountService.getBalance(id));
    const myNewBalance = mybalance - value;
    
    if(myNewBalance < 0) {
        throw new HttpException(422, 'insufficient balance');
    }
    
    const findClient = await prisma.users.findFirst({
        where: {
            username,
        },
    });

    if (!findClient) {
        throw new HttpException(404, 'Not found user') 
    }

    if ( id == findClient.id) {
        throw new HttpException(422, 'You can not transaction with yourself');
    }

    const friendBalance = Number(await accountService.getBalance(findClient.id));
    const newFriendBalance = friendBalance + value;

    const myTransaction = await prisma.$transaction(async(prisma) => {
        await prisma.accounts.update({
            where: {
                id,
            },
            data: {
                balance: myNewBalance
            }
        });

        await prisma.accounts.update({
            where: {
                id: findClient.id,
            },
            data: {
                balance: newFriendBalance
            }
        });

        const registerTransaction = await prisma.transactions.create({
            data: {
                value,
                debitedAccountId: id,
                creditedAccountId: findClient.accountsId
            }
        });
        return registerTransaction;
    })
    return myTransaction;
};

const getTransaction = async (id:number) => {
    const myTransactions = await prisma.transactions.findMany({
        where: {
            OR: [
                {
                    creditedAccountId: id,
                },
                {
                    debitedAccountId: id,
                },
            ],
        },
    });
    return myTransactions
};

export default { cashOut, getTransaction };
