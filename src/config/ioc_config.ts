import { ContainerModule } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { TYPE, MIDDLEWARE } from "../constants/types";
import * as interfaces from "../interfaces";
import { Logger } from "../infrastructure/logging/logger";
import { LoggerMiddleware } from "../infrastructure/logging/logger_middleware";
import { RoleAdminMiddleware, AuthorizeMiddleware } from "../infrastructure/auth/authorize_middleware";

export const bindings = new ContainerModule((bind) => {

    // Create bindings for middleware

    bind<BaseMiddleware>(MIDDLEWARE.RoleAdmin)
        .to(RoleAdminMiddleware)
        .inRequestScope();

    bind<BaseMiddleware>(MIDDLEWARE.Authorize)
        .to(AuthorizeMiddleware)
        .inRequestScope();

    bind<BaseMiddleware>(MIDDLEWARE.Logger)
        .to(LoggerMiddleware)
        .inRequestScope();

    // Create other bindings

    bind<interfaces.Logger>(TYPE.Logger)
        .to(Logger)
        .inRequestScope();

});
