import * as interfaces from "../interfaces";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";
import User from "./user";
import Post from "./post";

@Entity({ schema: "demo" })
export default class Comment implements interfaces.Comment {

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(type => User, user => user.id)
    @JoinColumn()
    public user: User;

    @ManyToOne(type => Post, post => post.id)
    @JoinColumn()
    public post: Post;

    @Column()
    public content: string;

    @CreateDateColumn()
    public createdDate: Date;

}
