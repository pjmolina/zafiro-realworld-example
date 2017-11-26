export const TYPE = {
    Logger: Symbol.for("Logger"),
    AccountRepository: Symbol.for("AccountRepository"),
    TweetRepository: Symbol.for("TweetRepository")
};

export const MIDDLEWARE = {
    RoleAdmin: Symbol.for("RoleAdmin"),
    Authorize: Symbol.for("Authorize"),
    Logger: Symbol.for("LoggerMiddleware")
};
