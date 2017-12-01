import { expect } from "chai";
import * as request from "supertest";
import { injectable } from "inversify";
import { interfaces } from "inversify-express-utils";
import { createApp, AccountRepository } from "zafiro";
import { bindings } from "../src/config/ioc_config";
import { expressConfig } from "../src/config/express_config";

interface AccountRepositoryMockFactoryOptions {
    details: any;
    isAuthenticated: boolean;
    isResourceOwner: boolean;
    isInRole: boolean;
}

export function accountRepositoryMockFactory(options: AccountRepositoryMockFactoryOptions) {
    @injectable()
    class MockAccountRepository implements AccountRepository {
        public getPrincipal(token: string): Promise<interfaces.Principal> {
            const mockPrincipal: interfaces.Principal = {
                details: options.details,
                isAuthenticated() {
                    return Promise.resolve(options.isAuthenticated);
                },
                isResourceOwner(resourceId: any) {
                    return Promise.resolve(options.isResourceOwner);
                },
                isInRole(role: string) {
                    return Promise.resolve(options.isResourceOwner);
                }
            }
            return Promise.resolve<interfaces.Principal>(mockPrincipal)
        }
        public isResourceOwner(userDetails: any, resourceId: any): Promise<boolean> {
            throw new Error("Method not implemented.");
        }
        public isInRole(userDetails: any, role: string): Promise<boolean> {
            throw new Error("Method not implemented.");
        }
    }
    return MockAccountRepository;
}
