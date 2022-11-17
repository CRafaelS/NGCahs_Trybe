import { Request, Response } from 'express';
import account from '../services/account.service';


const getBalance = async (_req: Request, res: Response) => {
    const { id } = res.locals;
    const balance = await account.getBalance(id)
    return res.status(200).json(balance);
}

const deposit = async (req: Request, res: Response) => {
    const { id } = res.locals;
    const { value } = req.body;
    const balance = await account.deposit(value, id)
    return res.status(201).json(balance);
}

export default {getBalance, deposit};