import * as express from "express";
import { interfaces } from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { Repository } from "typeorm";
import { TYPE } from "../../constants/types";
import { Logger, User, Tweet, Role, UserRole } from "../../interfaces";
import Principal from "./principal";

@injectable()
export class AuthProvider implements interfaces.AuthProvider {

    @inject(TYPE.UserRepository) private readonly _userRepository: Repository<User>;
    @inject(TYPE.UserRepository) private readonly _roleRepository: Repository<Role>;
    @inject(TYPE.UserRoleRepository) private readonly _userRoleRepository: Repository<UserRole>;
    @inject(TYPE.TweetRepository) private readonly _tweetRepository: Repository<Tweet>;
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
            const userOrUndefined = await this._userRepository.findOne({
                email: email
            });
            this._logger.info("AuthProvider =>", userOrUndefined);
            const principal = new Principal(
                userOrUndefined,
                this._userRepository,
                this._tweetRepository,
                this._roleRepository,
                this._userRoleRepository
            );
            return principal;
        } catch(e) {
            this._logger.error(e.message, e);
            return new Principal(
                null,
                this._userRepository,
                this._tweetRepository,
                this._roleRepository,
                this._userRoleRepository
            );
        }
    }

}