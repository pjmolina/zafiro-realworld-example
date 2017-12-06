import * as express from "express";
import {
    interfaces as expressInterfaces,
    BaseMiddleware
} from "inversify-express-utils";
import {
    makeMiddleware,
    isInRoleMiddlewareCb,
    isAuthenticatedMiddlewareCb,
    Logger
} from "zafiro";

const logMiddlewareCb = (logger: Logger) => (
    httpContext: expressInterfaces.HttpContext,
    next: express.NextFunction
) => {
    return (async () => {
        logger.info(`HTTP ${httpContext.request.method} ${httpContext.request.url}`);
        next();
    })();
};

export const IsAdminMiddleware = makeMiddleware(isInRoleMiddlewareCb("admin"));
export const Log = makeMiddleware(logMiddlewareCb);
