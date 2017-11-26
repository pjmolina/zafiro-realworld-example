import { injectable } from "inversify";
import * as interfaces from "../interfaces";

@injectable()
export class AccountRepository implements AccountRepository {
    getRoles(email: string): Promise<interfaces.Role[]> {
        throw new Error("Method not implemented 1.");
    }
    create(): Promise<interfaces.User[]> {
        throw new Error("Method not implemented 2.");
    }
    read(filter?: Partial<interfaces.User> | undefined): Promise<interfaces.User[]> {
        return Promise.resolve([
            { email: "test@test.com" }
        ]);
    }
    update(update: Partial<interfaces.User>): Promise<number> {
        throw new Error("Method not implemented 4.");
    }
    delete(filter?: Partial<interfaces.User> | undefined): Promise<number> {
        throw new Error("Method not implemented 5.");
    }
}
