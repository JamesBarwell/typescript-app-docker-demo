import { Request, Response, NextFunction } from "express";
import { getIpAddress } from "../repository/api";

async function ipAction(
    req: Request, res: Response, next: NextFunction
): Promise<void> {
    try {
        const result = await getIpAddress();
        res.setHeader("Content-Type", "plain/text");
        res.send(`My IP is: ${result}`);
    } catch (err) {
        next(err);
    }
}

export { ipAction };
