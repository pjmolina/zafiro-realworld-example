import { inject } from "inversify";
import { controller, httpGet, BaseHttpController } from "inversify-express-utils";
import { TYPE, MIDDLEWARE } from "../constants/types";
import { AccountRepository } from "../interfaces";

@controller("/account", MIDDLEWARE.Logger)
export class AccountController extends BaseHttpController {

    @inject(TYPE.AccountRepository) private readonly _repository: AccountRepository;

    @httpGet("/")
    private async get() {
        return await this._repository.read();
    }

    @httpGet("/suspend", MIDDLEWARE.RoleAdmin)
    private async suspend() {
        return await this._repository.read();
    }

}
