import { inject } from "inversify";
import { controller, httpGet, httpPost, BaseHttpController } from "inversify-express-utils";
import { MIDDLEWARE, TYPE } from "../constants/types";
import { TweetRepository } from "../interfaces";

@controller("/tweet", MIDDLEWARE.Logger)
export class TweetController extends BaseHttpController {

    @inject(TYPE.TweetRepository) private readonly _repository: TweetRepository;

    @httpGet("/")
    private async get() {
        return await this._repository.read();
    }

    @httpPost("/", MIDDLEWARE.Authorize)
    private async post() {
        return await this._repository.read();
    }

}
