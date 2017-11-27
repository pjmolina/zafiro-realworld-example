import chalk from "chalk";
import { Repository } from "typeorm";
import { interfaces as inversifyInterfaces } from "inversify";
import * as interfaces from "../interfaces";
import { TYPE } from "../constants/types";
import { readdirContents } from "./fs_utils";

export async function createRepositories(
    container: inversifyInterfaces.Container,
    directoryName: string,
    getPath: (dirOrFile: string[]) => string
) {
    const factory = container.get<interfaces.RepositoryFactory>(TYPE.RepositoryFactory);
    const entities = await readdirContents(directoryName, getPath);

    entities.forEach(async (entity) => {
        const repositoryType = Symbol.for(`Repository<${entity.default.name}>`);
        console.log(chalk.cyan(`Creating repository with TYPE ${repositoryType.toString()}`));
        const repository = await factory.getRepository<any>(
            entity,
            directoryName,
            getPath
        );
        container.bind<Repository<any>>(repositoryType).toConstantValue(repository);
    });

}

export async function loadControllers(
    directoryName: string,
    getPath: (dirOrFile: string[]) => string
) {
    const controllers = await readdirContents(directoryName, getPath);
    return controllers;
}
