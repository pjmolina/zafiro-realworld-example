import { expect } from "chai";
import * as request from "supertest";
import { interfaces } from "inversify-express-utils";
import { createApp } from "zafiro";
import { bindings } from "../src/config/ioc_config";
import { expressConfig } from "../src/config/express_config";
import { accountRepositoryMockFactory } from "./account_repository.mock";
import Post from "../src/entities/post";

const MockAccountNotAuthenticatedRepository = accountRepositoryMockFactory({
    details: null,
    isAuthenticated: true,
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

        const expectedPost = {
            userId: 1,
            title: "Test Title",
            content: "Test Content",
            createdDate: new Date()
        };

        request(app)
            .post("/api/v1/posts/")
            .send(expectedPost)
            .expect(403)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) {
                    done(err);
                }
                res.body.should.have.property('participant');
                res.body.participant.should.have.property('nuid', '98ASDF988SDF89SDF89989SDF9898');
                done();
            });

        

    });

});

