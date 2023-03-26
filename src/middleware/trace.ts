import { Request, Response, NextFunction } from 'express';

export function trace(req: Request, res: Response, next: NextFunction) {
    console.log('***************************************');
    console.log('User Agent: ' + req.headers['user-agent']);
    console.log('Attempted Path: ' + req.path);
    console.log('Source of Attempt: ' + req.headers['origin']);
    console.log('Timestamp of Event: ' + Date.now());
    console.log('***************************************');
    next();
}
