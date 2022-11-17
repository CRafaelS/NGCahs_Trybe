import express from 'express';
import 'express-async-errors';
import middlewareError from './middleware/middleware.error';
import router from './routes/client.route';

const port = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use(router);
app.use(middlewareError);

app.listen(port, () => console.log(`Api rodando na porta ${port}`));