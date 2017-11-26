import { inject } from "inversify";
import { controller, httpGet, httpPost, BaseHttpController } from "inversify-express-utils";
import { MIDDLEWARE, TYPE } from "../constants/types";
import { TweetRepository } from "../interfaces";

@controller("/tweet", MIDDLEWARE.Logger)
export class TweetController extends BaseHttpController {

    private readonly _repository: TweetRepository;

    public constructor(
        @inject(TYPE.TweetRepository) repository: TweetRepository
    ) {
        super();
        if (repository === null || repository === undefined) {
            throw new Error();
        }
        this._repository = repository;
    }

    @httpGet("/")
    private async get() {
        return await this._repository.read();
    }

    @httpPost("/", MIDDLEWARE.Authorize)
    private async post() {
        return await this._repository.read();
    }

}
