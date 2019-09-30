import express from "express";
import { Errback, Request, Response, NextFunction } from "express";
import { log } from "./log";

import * as ipController from "./controller/ip";

const app = express();

app.get("/", ipController.ipAction);

app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
    log.error("app", { err: err.toString() });

    if (res.headersSent) {
        return next(err);
    }

    res.status(500);
    return res.send("internal server error");
});

export { app };
