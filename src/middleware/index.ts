import * as express from "express";
import { interfaces as expressInterfaces } from "inversify-express-utils";
import { BaseMiddleware } from "inversify-express-utils";
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
    logger.info(`HTTP ${httpContext.request.method} ${httpContext.request.url}`);
};

export const IsAuthenticatedMiddleware = makeMiddleware(isAuthenticatedMiddlewareCb);
export const IsInRoleAdminMiddleware = makeMiddleware(isInRoleMiddlewareCb("admin"));
export const Log = makeMiddleware(logMiddlewareCb);
