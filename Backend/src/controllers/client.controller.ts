import { Request, Response } from 'express';
import client from '../services/client.service';


const newClient = async (req: Request, res: Response) => {
    const {username, password } = req.body
    const newClient = await client.createClient(username, password)
    return res.status(201).json(newClient);
}

const login = async (req: Request, res: Response) => {
    const {username, password } = req.body
    const token = await client.authClient(username, password)
    return res.status(200).json({token});
}

export default {newClient, login};