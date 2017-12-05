import "./env";
import * as express from "express";
import { expect } from "chai";
import { createApp } from "zafiro";
import * as request from "supertest";
import { Container } from "inversify";
import { getConnection } from "typeorm";
import { bindings } from "../src/config/ioc_config";
import { expressConfig } from "../src/config/express_config";
import { accountRepositoryMockFactory } from "./account_repository.mock";
import Post from "../src/entities/post";
import { httpPost } from "./test_utils";
import * as interfaces from "../src/interfaces";

describe("Auth Provider", () => {

    afterEach(async () => {
        const connection = getConnection();
        connection.close();
    });

    it("Should return 401 Unauthorized if no token is provided", async () => {

        const MockAccountNotAuthenticatedRepository = accountRepositoryMockFactory({
            details: null,
            isAuthenticated: false,
            isResourceOwner: false,
            isInRole: true
        });

        const result = await createApp({
            database: "postgres",
            containerModules: [bindings],
            AccountRepository: MockAccountNotAuthenticatedRepository,
            expressConfig: expressConfig
        });

        const expectedPost: interfaces.NewPost = {
            title: "Test Title",
            content: "Test Content"
        };

        const res = await httpPost<interfaces.NewPost>(
            result.app,
            "/api/v1/posts/",
            expectedPost,
            401,
            null,
            [["Content-Type", "text/html; charset=utf-8"]]
        );

        expect(res.body).to.eql({});

    });

});

