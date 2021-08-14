import {Request, Response} from 'express';

type ExpressIO = (req: Request, res: Response, next: any) => void

const wrapper = (asyncFn: ExpressIO) => {
    return async (req: Request, res: Response, next: any) => {
        try {
            return await asyncFn(req, res, next);
        } catch (error) {
            return next(error);
        }
    };
};


export {wrapper}