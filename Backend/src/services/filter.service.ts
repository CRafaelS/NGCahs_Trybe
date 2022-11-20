import { PrismaClient } from '@prisma/client';
import HttpException from '../utils/httpException';

const prisma = new PrismaClient();

const getTransactions = async (id:number) => {
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

const filterCreditOrDebitTransaction = async (id:number, type: string) => {
    if (type == "credit") {
        const filterByCredit = await prisma.transactions.findMany({
            where: { 
                creditedAccountId: id,
            },
        });
        return filterByCredit
    }

    if (type == "debit") {
        const filterByCredit = await prisma.transactions.findMany({
            where: { 
                debitedAccountId: id,
            },
        });
        return filterByCredit
    }
    
    else {
        throw new HttpException(404, 'choose debit or credit');
    }
};

// const filterByDate = async (id:number, date: string) => {
//     const filteredDate = await prisma.transactions.findMany({
//         where: {
//             AND: [
//                 {
//                     createdAt: {equals: new Date(date) }
//                 },
//                 {
//                     id,
//                 }
//             ],
//         },
//     })
//     return filteredDate
// };

export default { getTransactions, filterCreditOrDebitTransaction };