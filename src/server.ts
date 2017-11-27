import "reflect-metadata";
import { Container } from "inversify";
import { InversifyExpressServer } from 'inversify-express-utils';
import chalk from "chalk";
import * as path from "path";
import { bindings } from "./config/ioc_config";
import { expressConfig } from "./config/express_config";
import { AuthProvider } from "./config/auth_provider";
import { bindControllers, bindRepositories } from "./utils/ioc_utils";

(async () => {

    // Create and configure IoC container
    const container = new Container();

    // Create bindings
    container.load(bindings);

    // Create bindings for repositories
    await bindRepositories(
        container,
        "entities",
        (dirOrFile: string[]) => path.join(__dirname, ".", ...dirOrFile)
    );

    // Create bindings for controllers
    await bindControllers(
        "controllers",
        (dirOrFile: string[]) => path.join(__dirname, ".", ...dirOrFile)
    );

    // Create and configure Express server
    const server = new InversifyExpressServer(
        container,
        null,
        null,
        null,
        AuthProvider
    );

    server.setConfig(expressConfig);

    // Create and run Express app
    const app = server.build();
    app.listen(
        3000,
        () => console.log(
            chalk.green("Example app listening on port 3000!")
        )
    );


})();
