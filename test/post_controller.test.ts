import { expect } from "chai";
import { createApp } from "zafiro";
import * as request from "supertest";
import { Container } from "inversify";
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
    isInRole: true,
});

describe("Post Controller", () => {

    it("Should not be able to create a Post if not authenticated", async () => {

        const app = await createApp({
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
            app,
            "/api/v1/posts/",
            expectedPost,
            null,
            403,
            [['Content-Type', "json"]]
        );

        res.body.should.have.property('participant');
        res.body.participant.should.have.property('nuid', '98ASDF988SDF89SDF89989SDF9898');

    });

    it("Should not be able to update a Post if not the author");
    it("Should not be able to delete a Post if not the author");
    it("Should be able to get Posts by topic");

});

