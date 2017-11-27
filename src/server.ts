import "module-alias/register";
import "reflect-metadata";
import chalk from "chalk";
import { createApp } from "@lib/index";
import { bindings } from "./config/ioc_config";
import { expressConfig } from "./config/express_config";
import { AuthProvider } from "./infrastructure/auth/auth_provider";

(async () => {

    const app = await createApp({
        dir: ["..", "..", "src"],
        containerModules: [bindings],
        AuthProvider: AuthProvider,
        expressConfig: expressConfig
    });

    app.listen(
        3000,
        () => console.log(
            chalk.green("Example app listening on port 3000!")
        )
    );

})();
