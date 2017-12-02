import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import * as interfaces from "../interfaces";
import User from "./user";
import Post from "./post";

@Entity({ schema: "demo" })
export default class Comment implements interfaces.Comment {

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(type => User, user => user.id)
    public userId: number;

    @ManyToOne(type => User, user => user.id)
    public postId: number;

    @Column()
    public content: string;

    @CreateDateColumn()
    public createdDate: Date;

}
