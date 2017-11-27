import { inject } from "inversify";
import { controller, httpGet, httpPost, BaseHttpController } from "inversify-express-utils";
import { MIDDLEWARE, TYPE } from "../constants/types";
import { Repository } from "typeorm";
import { Tweet } from "../interfaces";

@controller("/tweet", MIDDLEWARE.Logger)
export default class TweetController extends BaseHttpController {

    @inject(TYPE.TweetRepository) private readonly _repository: Repository<Tweet>;

    @httpGet("/")
    private async get() {
        console.log(this._repository);
        return await this._repository.find();
    }

    @httpPost("/", MIDDLEWARE.Authorize)
    private async post(content: string) {
        return await this._repository.create({
            userId: this.httpContext.user.details.id,
            content: content
        });
    }

}
