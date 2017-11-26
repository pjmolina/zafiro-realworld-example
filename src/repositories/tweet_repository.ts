import { injectable } from "inversify";
import { Repository, Tweet } from "../interfaces";

@injectable()
export class TweetRepository implements Repository<Tweet> {
    create(): Promise<Tweet[]> {
        throw new Error("Method not implemented.");
    }
    read(filter?: Partial<Tweet> | undefined): Promise<Tweet[]> {
        throw new Error("Method not implemented.");
    }
    update(update: Partial<Tweet>): Promise<number> {
        throw new Error("Method not implemented.");
    }
    delete(filter?: Partial<Tweet> | undefined): Promise<number> {
        throw new Error("Method not implemented.");
    }
}
