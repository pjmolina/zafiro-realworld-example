import * as express from "express";
import { expect } from "chai";
import { createApp } from "zafiro";
import * as request from "supertest";
import { Container } from "inversify";
import { getConnection } from "typeorm";
import { bindings } from "../src/config/ioc_config";
import { expressConfig } from "../src/config/express_config";
import { accountRepositoryMockFactory } from "./account_repository.mock";
import { httpPost } from "./test_utils";
import * as interfaces from "../src/interfaces";

describe("Post Controller", () => {

    afterEach(() => {
        const connection = getConnection();
        connection.close();
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

    it("Should able to create a post if authenticated", async () => {

        const userId = 1;

        const MockAccountIsAuthenticatedRepository = accountRepositoryMockFactory({
            details: {
                id: userId
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

        const res = await httpPost<interfaces.NewPost>(
            result.app,
            "/api/v1/posts/",
            expectedPost,
            200,
            [["x-auth-token", "fake_credentials"]],
            [["Content-Type", "application/json; charset=utf-8"]]
        );

        const postDate = Date.parse(res.body.createdDate);

        expect(res.body.content).to.eql(expectedPost.content);
        expect(res.body.title).to.eql(expectedPost.title);
        expect(res.body.user).to.eql(userId);
        expect(isNaN(postDate)).to.eql(false);
        expect(isNaN(res.body.id)).to.eql(false);

    });

    it("Should return 400 if trying to save an invalid entity", async () => {

        const userId = 1;

        const MockAccountIsAuthenticatedRepository = accountRepositoryMockFactory({
            details: {
                id: userId
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
            title: "A very very very very very very very very very very lonf title",
            content: "Test Content"
        };

        const res = await httpPost<interfaces.NewPost>(
            result.app,
            "/api/v1/posts/",
            expectedPost,
            400,
            [["x-auth-token", "fake_credentials"]],
            [["Content-Type", "application/json; charset=utf-8"]]
        );

        expect(res.body.error).to.eql(
            `Post child "title" fails because ["title" length must be less than or equal to 20 characters long]`
        );

    });

    it("Should not be able to update a Post if not the author");
    it("Should not be able to delete a Post if not the author");
    it("Should be able to get Posts by topic");

});

