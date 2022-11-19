import { Router } from 'express';
import accountController from '../controllers/account.controller';
import clientController from '../controllers/client.controller';
import transactionController from '../controllers/transaction.controller';
import filterController from '../controllers/filter.controller';
import { isValidUsername, isValidPassword } from '../middleware/validateUser';
import { authMiddleware } from '../middleware/middleware.auth';
import { isValidValue } from '../middleware/middleware.value';

const routers = Router();

routers.post('/client', isValidUsername, isValidPassword, clientController.newClient);
routers.post('/auth', isValidUsername, isValidPassword, clientController.login);

routers.get('/account', authMiddleware, accountController.getBalance);
routers.post('/account', authMiddleware, isValidValue, accountController.deposit);

routers.post('/transaction', authMiddleware, isValidUsername, isValidValue, transactionController);

routers.get('/filter/transactions', authMiddleware, filterController.getTransactions);
routers.get('/filter/debit-or-credit', authMiddleware, filterController.filterCreditOrDebitTransaction);

export default routers;
