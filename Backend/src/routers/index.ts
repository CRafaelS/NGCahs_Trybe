import { Router } from 'express';
import clientController from '../controllers/client.controller';
import accountController from '../controllers/account.controller';
import { isValidUsername, isValidPassword } from '../middleware/validateUser';
import { authMiddleware } from '../middleware/middleware.auth';

const routers = Router();

routers.post('/client', isValidUsername, isValidPassword, clientController.newClient);
routers.get('/client', isValidUsername, isValidPassword, clientController.login);
routers.get('/account', authMiddleware, accountController);

export default routers;
