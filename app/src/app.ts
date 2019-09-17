import express from "express";
import { NextFunction, Request, Response } from "express";

import IpController from "./controller/ip";
import ApiRepo from "./repository/api";

export default (
    log: any,
    apiSource: any,
) => {
    const apiRepo = ApiRepo(apiSource);
    const ipController = IpController(apiRepo);

    const app = express();

    app.get("/", ipController.ipAction);

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        log.error("app", { err: err.toString() });

        if (res.headersSent) {
            return next(err);
        }

        res.status(500);
        return res.send("internal server error");
    });

    return app;
};
