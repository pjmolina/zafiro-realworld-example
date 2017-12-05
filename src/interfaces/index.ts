import { interfaces } from "inversify-express-utils";

export interface User {
    id: number;
    email: string;
    givenName: string;
    familyName: string;
    isBanned: boolean;
}

export type NewUser = Pick<User, "email"|"givenName"|"familyName"|"isBanned">;

export interface Comment {
    id: number;
    user: User;
    post: Post;
    content: string;
    createdDate: Date;
}

export interface Post {
    id: number;
    user: User;
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
    user: User;
    role: Role;
}
