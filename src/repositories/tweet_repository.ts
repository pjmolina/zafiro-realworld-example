import { injectable } from "inversify";
import * as interfaces from "../interfaces";

@injectable()
export class TweetRepository implements TweetRepository {
    getUserTweetFeed(email: string): Promise<interfaces.Tweet[]> {
        throw new Error("Method not implemented.");
    }
    getUserOwnTweets(email: string): Promise<interfaces.Tweet[]> {
        throw new Error("Method not implemented.");
    }
    create(): Promise<interfaces.Tweet[]> {
        throw new Error("Method not implemented.");
    }
    read(filter?: Partial<interfaces.Tweet> | undefined): Promise<interfaces.Tweet[]> {
        throw new Error("Method not implemented.");
    }
    update(update: Partial<interfaces.Tweet>): Promise<number> {
        throw new Error("Method not implemented.");
    }
    delete(filter?: Partial<interfaces.Tweet> | undefined): Promise<number> {
        throw new Error("Method not implemented.");
    }
}
