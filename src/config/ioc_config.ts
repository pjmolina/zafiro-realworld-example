import { ContainerModule } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { TYPE, MIDDLEWARE } from "../constants/types";
import * as interfaces from "../interfaces";
import { IsAuthenticatedMiddleware, IsInRoleAdminMiddleware, Log } from "../middleware";

export const bindings = new ContainerModule((bind) => {

    // Create bindings for middleware

    bind<BaseMiddleware>(MIDDLEWARE.IsInRoleAdmin)
        .to(IsInRoleAdminMiddleware)
        .inRequestScope();

    bind<BaseMiddleware>(MIDDLEWARE.IsAuthenticated)
        .to(IsAuthenticatedMiddleware)
        .inRequestScope();

    bind<BaseMiddleware>(MIDDLEWARE.Log)
        .to(Log)
        .inRequestScope();

});
