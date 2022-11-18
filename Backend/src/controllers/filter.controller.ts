import { Request, Response } from 'express';
import filterService from '../services/filter.service';

const getTransactions = async (req: Request, res: Response) => {
    const { id } = res.locals;
    const transaction = await filterService.getTransactions(id)
    return res.status(200).json(transaction);
}

const filterCreditOrDebitTransaction = async (req: Request, res: Response) => {
    const { id } = res.locals;
    const { type } = req.body;
    const transaction = await filterService.filterCreditOrDebitTransaction(id,type)
    return res.status(200).json(transaction);
}

export default { getTransactions, filterCreditOrDebitTransaction };