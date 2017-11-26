import * as express from "express";
import { interfaces } from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { TYPE } from "../constants/types";
import { AccountRepository, TweetRepository } from "../interfaces";

class Principal implements interfaces.Principal {

    private readonly _accountRepository: AccountRepository;
    private readonly _tweetRepository: TweetRepository;
    public details: any;

    public constructor(
        details: any,
        accountRepository: AccountRepository,
        tweetRepository: TweetRepository
    ) {
        this.details = details;
        this._accountRepository = accountRepository;
        this._tweetRepository = tweetRepository;
    }

    // We check it the user is authenticated
    public isAuthenticated() {
        if (this.details !== null && this.details !== undefined) {
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    }

    // We check if the current user is the owner
    // of a given resource, in our application
    // there is only one kind of resource: Tweets
    public async isResourceOwner(resourceId: any) {
        if (this.isAuthenticated()) {
            const tweets = await this._tweetRepository.read(
                { id: resourceId }
            );
            const userId = this.details.id;
            const isResourceOwner = tweets.filter(t => t.userId === userId).length === 1;
            if (isResourceOwner) {
                return true;
            }
        }
        return false;
    }

    // If user is authenticated we check if has a given role
    public async isInRole(role: string): Promise<boolean> {
        if (this.isAuthenticated()) {
            const roles = await this._accountRepository.getRoles(
                this.details.email
            );
            const hasRole = roles.filter(r => r.name === role).length === 1;
            if (hasRole) {
                return true;
            }
        }
        return false;
    }

}

@injectable()
export class AuthProvider implements interfaces.AuthProvider {

    @inject(TYPE.AccountRepository) private readonly _accountRepository: AccountRepository;
    @inject(TYPE.TweetRepository) private readonly _tweetRepository: TweetRepository;

    // Get the current Principal, if the user is
    // authenticated the principal will contain its details
    public async getUser(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<interfaces.Principal> {
        const token = req.headers["x-auth-token"]
        const email = `TODO USE ${token} to get email`;
        const users = await this._accountRepository.read(
            { email: email }
        );
        const userOrUndefined = users[0];
        const principal = new Principal(
            userOrUndefined,
            this._accountRepository,
            this._tweetRepository
        );
        return principal;
    }

}