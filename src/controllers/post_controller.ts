import { inject } from "inversify";
import { controller, httpGet, httpPost, BaseHttpController } from "inversify-express-utils";
import { MIDDLEWARE, TYPE } from "../constants/types";
import { Repository } from "typeorm";
import { Post } from "../interfaces";

@controller("/posts")
export default class PostRepository extends BaseHttpController {

    @inject(TYPE.PostRepository) private readonly _repository: Repository<Post>;

    @httpGet("/")
    private async get() {
        return await this._repository.find();
    }

    @httpPost("/", MIDDLEWARE.IsAuthenticated)
    private async post(content: string) {
        return await this._repository.create({
            userId: this.httpContext.user.details.id,
            content: content
        });
    }

}
