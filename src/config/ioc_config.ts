import { ContainerModule } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import * as path from "path";
import { loadControllers } from "../utils/ioc_utils";
import { TYPE, MIDDLEWARE } from "../constants/types";
import * as interfaces from "../interfaces";
import { AccountRepository } from "../repositories/account_repository";
import { TweetRepository } from "../repositories/tweet_repository";
import { AdminOnlyMiddleware, AuthorizeMiddleware } from "../middleware/authorize_middleware";
import { LoggerMiddleware } from "../middleware/logger_middleware";
import { Logger } from "../utils/logger";

export const bindings = new ContainerModule((bind) => {

    // Create bindings for controllers

    loadControllers(
        "controllers",
        (dirOrFile: string[]) => path.join(__dirname, "..", ...dirOrFile)
    );

    // Create bindings for repositories

    bind<interfaces.AccountRepository>(TYPE.AccountRepository)
        .to(AccountRepository)
        .inRequestScope();

    bind<interfaces.Repository<interfaces.Tweet>>(TYPE.TweetRepository)
        .to(TweetRepository)
        .inRequestScope();

    // Create bindings for middleware

    bind<BaseMiddleware>(MIDDLEWARE.AdminOnly)
        .to(AdminOnlyMiddleware)
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
