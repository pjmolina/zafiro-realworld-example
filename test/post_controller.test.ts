import * as express from "express";
import { expect } from "chai";
import { createApp } from "zafiro";
import * as request from "supertest";
import { Container } from "inversify";
import { getManager } from "typeorm";
import { bindings } from "../src/config/ioc_config";
import { expressConfig } from "../src/config/express_config";
import { accountRepositoryMockFactory } from "./account_repository.mock";
import { httPost } from "./test_utils";
import * as interfaces from "../src/interfaces";

describe("Post Controller", () => {

    afterEach(() => {
        if (getManager().connection.isConnected) {
            getManager().connection.close();
        }
    });

    it("Should not be able to create a Post if not authenticated", async () => {

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

        const res = await httPost<interfaces.NewPost>(
            result.app,
            "/api/v1/posts/",
            expectedPost,
            null,
            401,
            [["Content-Type", "text/html; charset=utf-8"]]
        );

        expect(res.body).to.eql({});

    });

    it("Should able to create a post if authenticated", async () => {

        const MockAccountIsAuthenticatedRepository = accountRepositoryMockFactory({
            details: {
                id: 1
            },
            isAuthenticated: true,
            isResourceOwner: false,
            isInRole: true
        });

        const result = await createApp({
            database: "postgres",
            containerModules: [bindings],
            AccountRepository: MockAccountIsAuthenticatedRepository,
            expressConfig: expressConfig
        });

        const expectedPost: interfaces.NewPost = {
            title: "Test Title",
            content: "Test Content"
        };

        const res = await httPost<interfaces.NewPost>(
            result.app,
            "/api/v1/posts/",
            expectedPost,
            [["x-auth-token", "fake_credentials"]],
            500,
            [["Content-Type", "text/html; charset=utf-8"]]
        );

    });

    it("Should not be able to update a Post if not the author");
    it("Should not be able to delete a Post if not the author");
    it("Should be able to get Posts by topic");

});

