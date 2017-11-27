import { createConnection } from "typeorm";
import { injectable, inject } from "inversify";
import { TYPE } from "../constants/types";
import * as interfaces from "../interfaces";
import { readdir } from "./fs_utils";

@injectable()
export class RepositoryFactory {

    @inject(TYPE.DbClient) private readonly _dbClient: interfaces.DbClient;

    public async getRepository<T>(
        entity: { new() : T },
        directoryName: string,
        getPath: (dirOrFile: string[]) => string
    ) {
        const connection = await this._dbClient.getConnection(
            directoryName,
            getPath
        );
        const repository = connection.getRepository<T>(entity);
        return repository;
    }

}

@injectable()
export class DbClient implements interfaces.DbClient {

    @inject(TYPE.Logger) private readonly _logger: interfaces.Logger;

    public async getConnection(
        directoryName: string,
        getPath: (dirOrFile: string[]) => string
    ) {
        try {
            return await this._createConnection(directoryName, getPath);
        } catch (err) {
            this._logger.error("Cannot connect to DB", err);
            throw err;
        }
    }

    private async _createConnection(
        directoryName: string,
        getPath: (dirOrFile: string[]) => string
    ) {

        const paths = await this._getEntityPaths(directoryName, getPath);
        const dbUser = process.env.POSTGRES_USER;
        const dbPassword = process.env.POSTGRES_PASSWORD;
        const dbHost = process.env.POSTGRES_HOST;
        const dbName = process.env.POSTGRES_DB;
        const connStr = `postgres://${dbUser}:${dbPassword}@${dbHost}:5432/${dbName}`;
        this._logger.info(`Trying to connect to DB: ${connStr}`);

        const connection = await createConnection({
            type: "postgres",
            host: dbHost,
            port: 5432,
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
