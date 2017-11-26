import { inject } from "inversify";
import { controller, httpGet, BaseHttpController } from "inversify-express-utils";
import { TYPE, MIDDLEWARE } from "../constants/types";
import { AccountRepository } from "../interfaces";

@controller("/account", MIDDLEWARE.Logger)
export class AccountController extends BaseHttpController {

    private readonly _repository: AccountRepository;

    public constructor(
        @inject(TYPE.AccountRepository) repository: AccountRepository
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

    @httpGet("/suspend", MIDDLEWARE.AdminOnly)
    private async suspend() {
        return await this._repository.read();
    }

}
