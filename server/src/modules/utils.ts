import {Request, Response} from 'express';

type ExpressIO = (req: Request, res: Response, next: any) => void

const wrapper = (asyncFn: ExpressIO) => {
    return (req: Request, res: Response, next: any) => {
        try {
            return asyncFn(req, res, next);
        } catch (error) {
            return next(error);
        }
    };
};


export {wrapper}