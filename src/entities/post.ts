import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";
import * as interfaces from "../interfaces";
import User from "./user";

@Entity()
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
