import * as express from "express";
import { BaseMiddleware } from "inversify-express-utils";
import { unauthorized, forbidden } from "../utils/http_utils";

export class Authorize extends BaseMiddleware {
    public handler(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): void {
        if (this.httpContext.user.isAuthenticated()) {
            next();
        } else {
            unauthorized(res);
        }
    }
}

export class AdminOnly extends BaseMiddleware {
    public handler(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): void {
        if (this.httpContext.user.isAuthenticated()) {
            if (this.httpContext.user.isInRole("admin")) {
                next();
            } else {
                forbidden(res);
            }
        } else {
            unauthorized(res);
        }
    }
}
