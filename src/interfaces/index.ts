import { interfaces } from "inversify-express-utils";

export interface User {
    id: number;
    email: string;
    givenName: string;
    familyName: string;
}

export type NewUser = Pick<User, "email"|"givenName"|"familyName">;

export interface Comment {
    id: number;
    userId: number;
    content: string;
    createdDate: Date;
}

export interface Post {
    id: number;
    userId: number;
    title: string;
    content: string;
    createdDate: Date;
}

export type NewPost = Pick<Post, "title"|"content">;

export interface Role {
    id: number;
    name: string;
}

export interface UserRole {
    id: number;
    userId: number;
    roleId: number;
}
