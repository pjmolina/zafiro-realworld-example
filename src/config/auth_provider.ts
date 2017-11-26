import * as express from "express";
import { interfaces } from "inversify-express-utils";
import { injectable } from "inversify";
import { accountRepository } from "../constants/decorators";
import { Repository, Account} from "../interfaces";

class Principal implements interfaces.Principal {
    private readonly _repository: Repository<Account>;
    public details: any;
    public constructor(
        details: any,
        repository: Repository<Account>
    ) {
        this.details = details;
        this._repository = repository;
    }
    public isAuthenticated(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    public isResourceOwner(resourceId: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    public isInRole(role: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}

@injectable()
export class AuthProvider implements interfaces.AuthProvider {

    @accountRepository private readonly _repository: Repository<Account>;

    public async getUser(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<interfaces.Principal> {
        const token = req.headers["x-auth-token"]
        const email = `TODO USE ${token} to get email`;
        const users = await this._repository.read(
            { email: email }
        );
        const user = users[0];
        const principal = new Principal(
            user,
            this._repository
        );
        return principal;
    }

}