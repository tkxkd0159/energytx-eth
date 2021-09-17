import { mkdir, readdir } from 'fs';
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

function checkDir(target_dir: string){
    let check = false
    const files = readdir(".", (err, files) =>{
        if (err) throw err;
        for (let file of files) {
            if (target_dir === file) {
                check = true;
                console.log("* ipfs folder exist")
                break;
            }
        }

        if (check === false) {
            mkdir(`./${target_dir}`, {recursive: true}, (err) => {
                if (err) throw err;
            })
        }
    });
}


export {wrapper, checkDir}