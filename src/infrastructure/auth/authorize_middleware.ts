import * as express from "express";
import { inject, injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { unauthorized, forbidden } from "../http/errors";
import { TYPE } from "../../constants/types";
import { Logger } from "../../interfaces";

@injectable()
export class AuthorizeMiddleware extends BaseMiddleware {
    @inject(TYPE.Logger) private readonly _logger: Logger;
    public handler(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): void {
        if (this.httpContext.user.isAuthenticated()) {
            this._logger.info("Authorized HTTP request");
            next();
        } else {
            this._logger.info("Unauthorized HTTP request");
            unauthorized(res);
        }
    }
}

@injectable()
export class RoleAdminMiddleware extends BaseMiddleware {
    @inject(TYPE.Logger) private readonly _logger: Logger;
    public handler(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): void {
        if (this.httpContext.user.isAuthenticated()) {
            if (this.httpContext.user.isInRole("admin")) {
                this._logger.info("Authorized HTTP request (Admin)");
                next();
            } else {
                this._logger.info("Forbidden HTTP request");
                forbidden(res);
            }
        } else {
            this._logger.info("Unauthorized HTTP request");
            unauthorized(res);
        }
    }
}
