import * as express from "express";
import { BaseMiddleware } from "inversify-express-utils";

export class LoggerMiddleware extends BaseMiddleware {
    public handler(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): void {
        throw new Error("Method not implemented.");
    }
}
