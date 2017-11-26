import * as express from "express";
import { interfaces } from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { TYPE } from "../constants/types";
import { AccountRepository, TweetRepository, Logger } from "../interfaces";

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
    @inject(TYPE.Logger) private readonly _logger: Logger;

    // Get the current Principal, if the user is
    // authenticated the principal will contain its details
    public async getUser(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<interfaces.Principal> {
        try {
            const token = req.headers["x-auth-token"]
            const email = `USE ${token} to get email`; // TODO 
            const users = await this._accountRepository.read(
                { email: email }
            );
            const userOrUndefined = users[0];
            this._logger.info("AuthProvider =>", userOrUndefined);
            const principal = new Principal(
                userOrUndefined,
                this._accountRepository,
                this._tweetRepository
            );
            return principal;
        } catch(e) {
            this._logger.error(e.message, e);
            return new Principal(
                null,
                this._accountRepository,
                this._tweetRepository
            );
        }
    }

}