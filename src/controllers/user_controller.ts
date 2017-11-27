import { inject } from "inversify";
import { controller, httpGet, BaseHttpController } from "inversify-express-utils";
import { TYPE, MIDDLEWARE } from "../constants/types";
import { Repository } from "typeorm";
import { User } from "../interfaces";

@controller("/user", MIDDLEWARE.Logger)
export default class UserController extends BaseHttpController {

    @inject(TYPE.UserRepository) private readonly _repository: Repository<User>;

    @httpGet("/")
    private async get() {
        return await this._repository.find();
    }

    @httpGet("/suspend", MIDDLEWARE.RoleAdmin)
    private async suspend() {
        return await this._repository.update(
            {
                id: 1
            },
            {
                enabled: false
            }
        );
    }

}
