import * as express from "express";
import { expect } from "chai";
import { createApp } from "zafiro";
import * as request from "supertest";
import { Container } from "inversify";
import { getManager } from "typeorm";
import { interfaces } from "inversify-express-utils";
import { bindings } from "../src/config/ioc_config";
import { expressConfig } from "../src/config/express_config";
import { accountRepositoryMockFactory } from "./account_repository.mock";
import Post from "../src/entities/post";
import { httPost } from "./test_utils";

const MockAccountNotAuthenticatedRepository = accountRepositoryMockFactory({
    details: null,
    isAuthenticated: false,
    isResourceOwner: false,
    isInRole: true
});

describe("Auth Provider", () => {

    it("Should return 401 Unauthorized if no token is provided", (done) => {

        (async () => {

            try {

                const result = await createApp({
                    database: "postgres",
                    containerModules: [bindings],
                    AccountRepository: MockAccountNotAuthenticatedRepository,
                    expressConfig: expressConfig
                });

                type PostKeys = keyof Post;
                type NewPost = Pick<Post, "userId"|"title"|"content"|"createdDate">;

                const expectedPost: NewPost = {
                    userId: 1,
                    title: "Test Title",
                    content: "Test Content",
                    createdDate: new Date()
                };

                const res = await httPost<NewPost>(
                    result.app,
                    "/api/v1/posts/",
                    expectedPost,
                    null,
                    401,
                    [["Content-Type", "text/html; charset=utf-8"]]
                );

            } finally {
                if (getManager().connection.isConnected) {
                    getManager().connection.close();
                }
                done();
            }

        })();

    });

});

