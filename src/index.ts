import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import { AppDataSource } from './data-source';
import router from './routes';
import { errorMiddleware } from './middlewares/error';

AppDataSource.initialize().then(() => {
    const app = express();

    app.use(express.json());

    app.use(router)

    app.use(errorMiddleware)

    return app.listen(process.env.PORT);
});