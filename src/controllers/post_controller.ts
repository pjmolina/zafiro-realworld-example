import * as express from "express";
import { inject } from "inversify";
import { validate } from "zafiro-validators";
import {
    controller,
    httpGet,
    httpPost,
    requestBody,
    BaseHttpController
} from "inversify-express-utils";
import { MIDDLEWARE, TYPE } from "../constants/types";
import { Repository } from "typeorm";
import * as interfaces from "../interfaces";
import Post from "../entities/post";

@controller("/api/v1/posts", MIDDLEWARE.Log)
export default class PostController extends BaseHttpController {

    @inject(TYPE.PostRepository) private readonly _repository: Repository<interfaces.Post>;

    @httpGet("/")
    private async get() {
        return await this._repository.find();
    }

    @httpPost("/", MIDDLEWARE.IsAuthenticated)
    private async post(
        @requestBody() newPost: interfaces.NewPost
    ) {
        const user: number = this.httpContext.user.details.id;
        const post = {
            ...newPost,
            ...{ user: user }
        };
        const result = validate(post, Post);
        if (result.error) {
            return this.httpContext.response.status(400)
                .json({
                    error: `Post ${result.error.message}`
                });
        }
        return await this._repository.save(post);
    }

}
