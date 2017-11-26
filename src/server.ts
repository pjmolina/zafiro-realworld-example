import "reflect-metadata";
import { Container } from "inversify";
import { interfaces, InversifyExpressServer } from 'inversify-express-utils';
import chalk from "chalk";
import { bindings } from "./config/ioc_config";
import { expressConfig } from "./config/express_config";
import { AuthProvider } from "./config/auth_provider";

// Create and configure IoC container
const container = new Container();
container.load(bindings);

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
