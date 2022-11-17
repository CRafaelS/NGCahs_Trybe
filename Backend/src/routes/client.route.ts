import { Router } from 'express';
import clientController from '../controllers/client.controller';
import { isValidUsername, isValidPassword } from '../middleware/validateUser'

const routers = Router();

routers.post('/client', isValidUsername, isValidPassword, clientController);

export default routers;
