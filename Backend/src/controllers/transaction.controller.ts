import { Request, Response } from 'express';
import transactionService from '../services/transactions.service';


const newTransaction = async (req: Request, res: Response) => {
    const { id } = res.locals;
    const {username, value } = req.body;
    const transaction = await transactionService.cashOut(username, value, id);
    return res.status(201).json(transaction);
}

const getTransactions = async (req: Request, res: Response) => {
    const { id } = res.locals;
    const transaction = await transactionService.getTransaction(id)
    return res.status(200).json(transaction);
}

export default { newTransaction, getTransactions };