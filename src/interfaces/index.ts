export interface User {
    email: string;
}

export interface Tweet {
    id: number;
    userId: number;
}

export interface Role {
    id: number;
    name: string;
}

export interface Repository<T> {
    create(): Promise<T[]>;
    read(filter?: Partial<T>): Promise<T[]>;
    update(update: Partial<T>): Promise<number>;
    delete(filter?: Partial<T>): Promise<number>;
}

export interface AccountRepository extends Repository<User> {
    getRoles(email: string): Promise<Role[]>;
}

export interface TweetRepository extends Repository<Tweet> {
    getUserTweetFeed(email: string): Promise<Tweet[]>;
    getUserOwnTweets(email: string): Promise<Tweet[]>;
}

export interface Logger {
    info(msg: string, ...args: any[]): void;
    error(msg: string, ...args: any[]): void;
    debug(msg: string, ...args: any[]): void;
    warn(msg: string, ...args: any[]): void;
}
