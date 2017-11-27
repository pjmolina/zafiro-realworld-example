import { createConnection, Connection } from "typeorm";
import { injectable, inject } from "inversify";
import chalk from "chalk";
import { TYPE } from "../constants/types";
import * as interfaces from "../interfaces";
import readdir from "../fs/readdir";

@injectable()
export default class RepositoryFactory implements interfaces.RepositoryFactory {

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
            const repository = connection.getRepository<T>(entity);
            console.log(chalk.green("Success!"));
            return repository;
        });
        return repositories;
    }

}
