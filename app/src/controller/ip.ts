import { NextFunction, Request, Response } from "express";

export default (apiRepo: any) => {
    async function ipAction(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await apiRepo.getIpAddress();
            res.setHeader("Content-Type", "plain/text");
            res.send(`My IP is: ${result}`);
        } catch (err) {
            next(err);
        }
    }

    return {
        ipAction,
    };
};
