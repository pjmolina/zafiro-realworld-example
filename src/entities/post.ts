import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import * as interfaces from "../interfaces";
import User from "./user";

@Entity({ schema: "demo" })
export default class Post implements interfaces.Post {

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(type => User, user => user.id)
    public userId: number;

    @Column()
    public title: string;

    @Column()
    public content: string;

    @CreateDateColumn()
    public createdDate: Date;

}
