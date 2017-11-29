import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import * as interfaces from "../interfaces";

@Entity({ schema: "demo" })
export default class Post implements interfaces.Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    content: string;

    @CreateDateColumn()
    createdDate: Date;

}
