import { ContainerModule } from "inversify";
import { TYPE } from "../constants/types";
import * as interfaces from "../interfaces";
import DbClient from "../db/db_client";
import RepositoryFactory from "../db/repository_factory";

export const coreBindings = new ContainerModule((bind) => {

    bind<interfaces.DbClient>(TYPE.DbClient)
        .to(DbClient)
        .inSingletonScope();

    bind<interfaces.RepositoryFactory>(TYPE.RepositoryFactory)
        .to(RepositoryFactory)
        .inSingletonScope();

});
