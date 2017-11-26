import { injectable } from "inversify";
import * as interfaces from "../interfaces";

@injectable()
export class AccountRepository implements AccountRepository {
    getRoles(email: string): Promise<interfaces.Role[]> {
        throw new Error("Method not implemented.");
    }
    create(): Promise<interfaces.User[]> {
        throw new Error("Method not implemented.");
    }
    read(filter?: Partial<interfaces.User> | undefined): Promise<interfaces.User[]> {
        throw new Error("Method not implemented.");
    }
    update(update: Partial<interfaces.User>): Promise<number> {
        throw new Error("Method not implemented.");
    }
    delete(filter?: Partial<interfaces.User> | undefined): Promise<number> {
        throw new Error("Method not implemented.");
    }
}
