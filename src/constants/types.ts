export const TYPE = {
    Logger: Symbol.for("Logger"),
    DbClient: Symbol.for("DbClient"),
    RepositoryFactory: Symbol.for("RepositoryFactory"),
    UserRepository: Symbol.for("Repository<User>"),
    TweetRepository: Symbol.for("Repository<Tweet>"),
    UserRoleRepository: Symbol.for("Repository<Role>")
};

export const MIDDLEWARE = {
    RoleAdmin: Symbol.for("RoleAdmin"),
    Authorize: Symbol.for("Authorize"),
    Logger: Symbol.for("LoggerMiddleware")
};
