import { injectable } from "inversify";
import * as interfaces from "../interfaces";

@injectable()
export class TweetRepository implements TweetRepository {
    getUserTweetFeed(email: string): Promise<interfaces.Tweet[]> {
        throw new Error("Method not implemented 6.");
    }
    getUserOwnTweets(email: string): Promise<interfaces.Tweet[]> {
        throw new Error("Method not implemented 7.");
    }
    create(): Promise<interfaces.Tweet[]> {
        throw new Error("Method not implemented 8.");
    }
    read(filter?: Partial<interfaces.Tweet> | undefined) {
        return Promise.resolve([
            {
                id: 1,
                userId: 1,
                content: "Hello world!"
            }
        ]);
    }
    update(update: Partial<interfaces.Tweet>): Promise<number> {
        throw new Error("Method not implemented 9.");
    }
    delete(filter?: Partial<interfaces.Tweet> | undefined): Promise<number> {
        throw new Error("Method not implemented 10.");
    }
}
