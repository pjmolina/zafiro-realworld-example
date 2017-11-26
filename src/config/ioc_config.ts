import { ContainerModule } from "inversify";
import * as path from "path";
import { Repository, Account, Tweet } from "../interfaces";
import { loadControllers } from "../utils/ioc_utils";
import { TYPE } from "../constants/types";
import { AccountRepository } from "../repositories/account_repository";
import { TweetRepository } from "../repositories/tweet_repository";

export const bindings = new ContainerModule((bind) => {

    // Create bindings for controllers
    loadControllers(
        "controllers",
        (dirOrFile: string[]) => path.join(__dirname, "..", ...dirOrFile)
    );

    // Create bindings for repositories
    bind<Repository<Account>>(TYPE.AccountRepository)
        .to(AccountRepository)
        .inRequestScope();

    bind<Repository<Account>>(TYPE.TweetRepository)
        .to(TweetRepository)
        .inRequestScope();

});
