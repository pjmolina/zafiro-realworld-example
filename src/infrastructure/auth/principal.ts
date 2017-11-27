import { interfaces } from "inversify-express-utils";
import { Repository } from "typeorm";
import { Logger, User, Tweet, Role, UserRole } from "../../interfaces";

export default class Principal implements interfaces.Principal {

    private readonly _userRepository: Repository<User>;
    private readonly _tweetRepository: Repository<Tweet>;
    private readonly _roleRepository: Repository<Role>;
    private readonly _userRoleRepository: Repository<UserRole>;
    public details: any;

    public constructor(
        details: any,
        userRepository: Repository<User>,
        tweetRepository: Repository<Tweet>,
        roleRepository: Repository<Role>,
        userRoleRepository: Repository<UserRole>
    ) {
        this.details = details;
        this._userRepository = userRepository;
        this._tweetRepository = tweetRepository;
        this._roleRepository = roleRepository;
        this._userRoleRepository = userRoleRepository;
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
            const userId = this.details.id;
            const tweet = await this._tweetRepository.findOne({
                userId: userId,
                id: resourceId
            });
            if (tweet) {
                return true;
            }
        }
        return false;
    }

    // If user is authenticated we check if has a given role
    public async isInRole(roleName: string): Promise<boolean> {
        if (this.isAuthenticated()) {
            const role = await this._roleRepository.findOne({
                name: roleName
            });
            if (role) {
                const userRole = this._userRoleRepository.findOne({
                    userId: 1,
                    roleId: role.id
                });
                if (userRole) {
                    return true;
                }
            }
        }
        return false;
    }

}
