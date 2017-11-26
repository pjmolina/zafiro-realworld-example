import * as express from "express";
import { controller, httpGet, BaseHttpController } from "inversify-express-utils";
import { accountRepository } from "../constants/decorators";
import { Repository, Account} from "../interfaces";

@controller("/account")
export class AccountController extends BaseHttpController {

    private readonly _repository: Repository<Account>;

    public constructor(
        @accountRepository repository: Repository<Account>
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

}
