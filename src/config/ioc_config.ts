import { ContainerModule } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { TYPE, MIDDLEWARE } from "../constants/types";
import * as interfaces from "../interfaces";
import { RoleAdminMiddleware, AuthorizeMiddleware } from "../middleware/authorize_middleware";
import { LoggerMiddleware } from "../middleware/logger_middleware";
import { Logger } from "../utils/logger";
import { DbClient, RepositoryFactory } from "../utils/db_utils";

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

    bind<interfaces.DbClient>(TYPE.DbClient)
        .to(DbClient)
        .inRequestScope();

    bind<interfaces.RepositoryFactory>(TYPE.RepositoryFactory)
        .to(RepositoryFactory)
        .inRequestScope();

});
