import "reflect-metadata";
import chalk from "chalk";
import { Container } from "inversify";
import { createApp } from "zafiro";
import { bindings } from "./config/ioc_config";
import { expressConfig } from "./config/express_config";
import CustomAccountRepository from "./repositories/account_repository";
import { createOpenApiSpec }  from "zafiro-openapi3";

(async () => {

    try {
        const container = new Container(); // Create container

        const result = await createApp({
            database: "postgres",
            container: container, // Pass container
            containerModules: [bindings],
            AccountRepository: CustomAccountRepository,
            expressConfig: expressConfig
        });

        await createOpenApiSpec(container, result.app, "/openapi.json"); // Use container to generate Open Api Spec
        console.log(chalk.yellowBright("OpenAPI contract at /openapi.json"));

        result.app.listen(
            3000,
            () => console.log(
                chalk.green("Example app listening on port 3000!")
            )
        );

    } catch (e) {
        console.log(chalk.redBright(e.message));
    }

})();
