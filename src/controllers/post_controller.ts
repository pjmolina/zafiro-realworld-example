import * as express from "express";
import { inject } from "inversify";
import {
    controller,
    httpGet,
    httpPost,
    requestBody,
    BaseHttpController
} from "inversify-express-utils";
import { MIDDLEWARE, TYPE } from "../constants/types";
import { Repository } from "typeorm";
import { Post, NewPost } from "../interfaces";

@controller("/api/v1/posts", MIDDLEWARE.Log)
export default class PostController extends BaseHttpController {

    @inject(TYPE.PostRepository) private readonly _repository: Repository<Post>;

    @httpGet("/")
    private async get() {
        return await this._repository.find();
    }

    @httpPost("/", MIDDLEWARE.IsAuthenticated)
    private async post() {
        const newPost = this.httpContext.request.body;
        const post: Post = {
            ...newPost,
            ...{ user: this.httpContext.user.details.id }
        };
        const result = await this._repository.save(post);
        return result;
    }

}
