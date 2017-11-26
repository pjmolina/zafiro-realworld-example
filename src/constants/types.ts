export const TYPE = {
    AccountRepository: Symbol.for("AccountRepository"),
    TweetRepository: Symbol.for("TweetRepository")
};

export const MIDDLEWARE = {
    AdminOnly: Symbol.for("AdminOnly"),
    Authorize: Symbol.for("Authorize")
};
