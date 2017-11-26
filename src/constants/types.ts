export const TYPE = {
    Logger: Symbol.for("Logger"),
    AccountRepository: Symbol.for("AccountRepository"),
    TweetRepository: Symbol.for("TweetRepository")
};

export const MIDDLEWARE = {
    AdminOnly: Symbol.for("AdminOnly"),
    Authorize: Symbol.for("Authorize"),
    Logger: Symbol.for("LoggerMiddleware")
};
