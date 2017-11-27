import chalk from "chalk";
import readdirContents from "../fs/readdir_contents";

export default async function bindControllers(
    directoryName: string,
    getPath: (dirOrFile: string[]) => string
) {
    const controllers = await readdirContents(directoryName, getPath);
    return controllers;
}
