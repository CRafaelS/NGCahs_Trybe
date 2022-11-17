import { Router } from 'express';
import accountController from '../controllers/account.controller';
import clientController from '../controllers/client.controller';
import transactionController from '../controllers/transaction.controller';
import { isValidUsername, isValidPassword } from '../middleware/validateUser';
import { authMiddleware } from '../middleware/middleware.auth';

const routers = Router();

routers.post('/client', isValidUsername, isValidPassword, clientController.newClient);
routers.get('/client', isValidUsername, isValidPassword, clientController.login);

routers.get('/account', authMiddleware, accountController.getBalance);
routers.post('/account', authMiddleware, accountController.deposit);

routers.post('/transaction', authMiddleware, transactionController);

export default routers;
