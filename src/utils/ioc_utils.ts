import * as fs from "fs";
import chalk from "chalk";
import { ERROR_MSG } from "../constants/error_msg";

export function loadControllers(
    directoryName: string,
    getPath: (dirOrFile: string[]) => string
) {
    const controllersPath = getPath([directoryName]);
    try {
        const files = fs.readdirSync(controllersPath);
        files.forEach((fileName) => {
            const controllerPath = getPath([directoryName, fileName]);
            console.log(chalk.cyan(`Loading Controller: ${controllerPath}`));
            require(controllerPath);
            console.log(chalk.green("Success!"));
        });
    } catch (e) {
        console.log(
            chalk.red(
                ERROR_MSG.cannot_load_controllers_in_path(controllersPath)
            )
        );
        throw e;
    }
}
