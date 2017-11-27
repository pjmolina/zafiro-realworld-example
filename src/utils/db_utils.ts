import { createConnection, Connection } from "typeorm";
import { injectable, inject } from "inversify";
import chalk from "chalk";
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
            console.log(chalk.cyan(`Creating repository for entity: ${entity.name}`));
            console.log(entity);
            const repository = connection.getRepository<T>(entity);
            console.log(chalk.green("Success!"));
            return repository;
        });
        return repositories;
    }

}

@injectable()
export class DbClient implements interfaces.DbClient {

    private _cache: Connection | null = null;

    public async getConnection(
        directoryName: string,
        getPath: (dirOrFile: string[]) => string
    ) {
        if (this._cache !== null) {
            return this._cache;
        } else {
            this._cache = await this._createConnection(directoryName, getPath);
            return this._cache;
        }
    }

    private async _createConnection(
        directoryName: string,
        getPath: (dirOrFile: string[]) => string
    ) {
        try {
            const dbHost = process.env.POSTGRES_HOST;
            const dbPort = 5432;
            const dbUser = process.env.POSTGRES_USER;
            const dbPassword = process.env.POSTGRES_PASSWORD;
            const dbName = process.env.POSTGRES_DB;
            const connStr = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
            const paths = await this._getEntityPaths(directoryName, getPath);
            console.log(chalk.cyan(`Trying to connect to DB: ${connStr}`));
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
            console.log(chalk.green("Success!"));
            return connection;

        } catch (err) {
            console.log(chalk.red("Cannot connect to DB"));
            throw err;
        }
    }

    private async _getEntityPaths(
        directoryName: string,
        getPath: (dirOrFile: string[]) => string
    ) {
        const files = await readdir(directoryName, getPath);
        return files.map(fileName => getPath([directoryName, fileName]));
    }

}
