export interface User {
    id: number;
    email: string;
    enabled: boolean;
}

export interface Tweet {
    id: number;
    userId: number;
    content: string;
}

export interface Role {
    id: number;
    name: string;
}

export interface UserRole {
    id: number;
    userId: number;
    roleId: number;
}

export interface Logger {
    info(msg: string, ...args: any[]): void;
    error(msg: string, ...args: any[]): void;
    debug(msg: string, ...args: any[]): void;
    warn(msg: string, ...args: any[]): void;
    success(msg: string, ...args: any[]): void;
}
