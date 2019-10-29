import { Request, Response, NextFunction } from "express";
import { fetchIpAddress } from "../source/api";

async function ipAction(
    req: Request, res: Response, next: NextFunction
): Promise<void> {
    try {
        const result = await fetchIpAddress();
        res.setHeader("Content-Type", "plain/text");
        res.send(`My IP is: ${result.ip}`);
    } catch (err) {
        next(err);
    }
}

export { ipAction };
