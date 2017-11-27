import * as express from "express";
import { inject, injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { TYPE } from "../../constants/types";
import { Logger } from "../../interfaces";

@injectable()
export class LoggerMiddleware extends BaseMiddleware {
    @inject(TYPE.Logger) private readonly _logger: Logger;
    public handler(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): void {
        this._logger.info(`HTTP ${req.method} ${req.url}`);
        next();
    }
}
