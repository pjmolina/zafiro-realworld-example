import { createConnection, Connection } from "typeorm";
import { injectable, inject } from "inversify";
import { TYPE } from "../constants/types";
import * as interfaces from "../interfaces";
import { readdir } from "./fs_utils";

@injectable()
export class RepositoryFactory implements interfaces.RepositoryFactory {

    @inject(TYPE.DbClient) private readonly _dbClient: interfaces.DbClient;

    public async getRepository<T>(
        entities: Array<{ new() : T }>,
        directoryName: string,
        getPath: (dirOrFile: string[]) => string
    ) {
        const connection = await this._dbClient.getConnection(
            directoryName,
            getPath
        );
        const repositories = entities.map((entity) => {
            return connection.getRepository<T>(entity);
        });
        return repositories;
    }

}

@injectable()
export class DbClient implements interfaces.DbClient {

    @inject(TYPE.Logger) private readonly _logger: interfaces.Logger;
    private _cache: Connection | null = null;

    public async getConnection(
        directoryName: string,
        getPath: (dirOrFile: string[]) => string
    ) {
        try {
            if (this._cache !== null) {
                return this._cache;
            } else {
                this._cache = await this._createConnection(directoryName, getPath);
                return this._cache;
            }
        } catch (err) {
            this._logger.error("Cannot connect to DB", err);
            throw err;
        }
    }

    private async _createConnection(
        directoryName: string,
        getPath: (dirOrFile: string[]) => string
    ) {

        const dbHost = process.env.POSTGRES_HOST;
        const dbPort = 5432;
        const dbUser = process.env.POSTGRES_USER;
        const dbPassword = process.env.POSTGRES_PASSWORD;
        const dbName = process.env.POSTGRES_DB;
        const connStr = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
        const paths = await this._getEntityPaths(directoryName, getPath);

        this._logger.info(`Trying to connect to DB: ${connStr}`);
        const connection = await createConnection({
            type: "postgres",
            host: dbHost,
            port: dbPort,
            username: dbUser,
            password: dbPassword,
            database: dbName,
            entities: paths,
            synchronize: true,
        });

        return connection;

    }

    private async _getEntityPaths(
        directoryName: string,
        getPath: (dirOrFile: string[]) => string
    ) {
        const files = await readdir(directoryName, getPath);
        const paths = files.map(fileName => {
            return getPath([directoryName, fileName]);
        });
        return paths;
    }

}
