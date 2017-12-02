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

@Entity({ schema: "demo" })
export default class Post implements interfaces.Post {

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(type => User, user => user.id)
    @JoinColumn()
    public user: User;

    @Column()
    public title: string;

    @Column()
    public content: string;

    @CreateDateColumn()
    public createdDate: Date;

}
