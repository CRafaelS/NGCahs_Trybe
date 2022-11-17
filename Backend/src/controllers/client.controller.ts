import { Request, Response } from 'express';
import createClient from '../services/client.service';


const newClient = async (req: Request, res: Response) => {
    const {username, password } = req.body
    const newClient = await createClient(username, password)
    return res.status(201).json(newClient);
}

export default newClient;