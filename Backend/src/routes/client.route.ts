import { Router } from 'express';
import clientController from '../controllers/client.controller';

const routers = Router();

routers.post('/client', clientController);

export default routers;
