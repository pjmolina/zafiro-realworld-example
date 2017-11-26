import { injectable } from "inversify";
import { Repository, Account } from "../interfaces";

@injectable()
export class AccountRepository implements Repository<Account> {
    create(): Promise<Account[]> {
        throw new Error("Method not implemented.");
    }
    read(filter?: Partial<Account> | undefined): Promise<Account[]> {
        throw new Error("Method not implemented.");
    }
    update(update: Partial<Account>): Promise<number> {
        throw new Error("Method not implemented.");
    }
    delete(filter?: Partial<Account> | undefined): Promise<number> {
        throw new Error("Method not implemented.");
    }
}
