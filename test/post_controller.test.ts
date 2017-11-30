import { expect } from "chai";
import * as request from "supertest";
import chalk from "chalk";
import { createApp } from "zafiro";
import { bindings } from "../src/config/ioc_config";
import { expressConfig } from "../src/config/express_config";
import CustomAccountRepository from "../src/repositories/account_repository";

describe("Post Controller", () => {

    it("Should be able to createa Post", async () => {

        const app = await createApp({
            database: "postgres",
            containerModules: [bindings],
            AccountRepository: CustomAccountRepository,
            expressConfig: expressConfig
        });

        request(app)
            .get("/api/v1/posts/")
            .set("x-auth-token", "FAKE")
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((res: any) => {

            })
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
            });
    });

});

