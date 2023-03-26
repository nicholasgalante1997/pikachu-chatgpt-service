import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export function validateReq(req: Request, res: Response, next: NextFunction) {
    const reqHeaderKey = req.headers['x-pikachu-ai-service-key'];
    const envKeySafeCheck = process.env.X_PIKACHU_AI_SERVICE_KEY;
    if (envKeySafeCheck === reqHeaderKey) {
        next();
    } else {
        res.status(301).json({ exception: "Unauthorized attempt to access resources. Key not present on request."})
    }
}
