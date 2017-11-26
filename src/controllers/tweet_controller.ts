import { inject } from "inversify";
import { controller, httpGet, BaseHttpController } from "inversify-express-utils";
import { MIDDLEWARE, TYPE } from "../constants/types";
import { Repository, Tweet} from "../interfaces";

@controller("/tweet", MIDDLEWARE.Logger)
export class TweetController extends BaseHttpController {

    private readonly _repository: Repository<Tweet>;

    public constructor(
        @inject(TYPE.TweetRepository) repository: Repository<Tweet>
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

    @httpGet("/", MIDDLEWARE.Authorize)
    private async post() {
        return await this._repository.read();
    }

}
