import { NextFunction, Response, Request } from 'express';
import { ApiError } from '../helpers/api-erros';

export const errorMiddleware = (
    error: Error & Partial<ApiError>,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = error.statusCode ?? 500
    const message = error.statusCode ? error.message : 'Internal server error'
    return res.status(500).json({ message })
}
