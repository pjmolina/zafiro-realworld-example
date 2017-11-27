import { Container } from "inversify";
import * as path from "path";
import { InversifyExpressServer } from "inversify-express-utils";
import { coreBindings }  from "../config/ioc_config";
import bindControllers from "../ioc/bind_controllers";
import bindRepositories from "../ioc/bind_repositories";
import * as interfaces from "../interfaces";

export default async function createApp(
    options: interfaces.AppOptions
) {
    
    // Create and configure IoC container
    const container = new Container();
    
    // Create bindings
    const modules = options.containerModules;
    container.load(coreBindings, ...modules);

    // Create bindings for repositories
    await bindRepositories(
        container,
        "entities",
        (dirOrFile: string[]) => path.join(__dirname, ...options.dir, ...dirOrFile)
    );

    // Create bindings for controllers
    await bindControllers(
        "controllers",
        (dirOrFile: string[]) => path.join(__dirname, ...options.dir, ...dirOrFile)
    );

    // Create and configure Express server
    const server = new InversifyExpressServer(
        container,
        null,
        null,
        null,
        options.AuthProvider
    );

    server.setConfig(options.expressConfig);

    // Create and run Express app
    const app = server.build();

    return app;

}
