import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import * as interfaces from "../interfaces";
import User from "./user";
import Post from "./post";

@Entity({ schema: "demo" })
export default class Comment implements interfaces.Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.id)
    userId: number;

    @ManyToOne(type => User, user => user.id)
    postId: number;

    @Column()
    content: string;

    @CreateDateColumn()
    createdDate: Date;

}
