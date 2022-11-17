import { Request, Response } from 'express';
import account from '../services/account.service';


const getBalance = async (req: Request, res: Response) => {
    const { id } = res.locals;
    const balance = await account(id)
    return res.status(200).json(balance);
}

export default getBalance;