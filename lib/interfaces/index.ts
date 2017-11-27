import { Connection, Repository } from "typeorm";
import * as express from "express";
import { interfaces } from "inversify";
import { interfaces as expressInterfaces } from "inversify-express-utils";

export interface AppOptions {
    dir: string[],
    containerModules: interfaces.ContainerModule[],
    AuthProvider: { new(): expressInterfaces.AuthProvider },
    expressConfig: (app: express.Application) => void
}

export interface DbClient {
    getConnection(
        directoryName: string,
        getPath: (dirOrFile: string[]) => string
    ): Promise<Connection>;
}

export interface RepositoryFactory {
    getRepository<T>(
        entity: Array<{ new (): T }>,
        directoryName: string,
        getPath: (dirOrFile: string[]) => string
    ): Promise<Repository<T>[]>
}
