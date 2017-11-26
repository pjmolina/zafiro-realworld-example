import { controller, httpGet, BaseHttpController } from "inversify-express-utils";
import { accountRepository } from "../constants/decorators";
import { AccountRepository } from "../interfaces";
import { MIDDLEWARE } from "../constants/types";

@controller("/account")
export class AccountController extends BaseHttpController {

    private readonly _repository: AccountRepository;

    public constructor(
        @accountRepository repository: AccountRepository
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
