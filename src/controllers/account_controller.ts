import { inject } from "inversify";
import { controller, httpGet, BaseHttpController } from "inversify-express-utils";
import { TYPE, MIDDLEWARE } from "../constants/types";
import { Repository } from "typeorm";
import { User } from "../interfaces";

@controller("/api/v1/account", MIDDLEWARE.Log)
export default class AccountController extends BaseHttpController {

    @inject(TYPE.UserRepository) private readonly _repository: Repository<User>;

    @httpGet("/")
    private async get() {
        return await this._repository.find();
    }

}
