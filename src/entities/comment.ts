import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import * as interfaces from "../interfaces";

@Entity({ schema: "demo" })
export default class Comment implements interfaces.Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    content: string;

    @CreateDateColumn()
    createdDate: Date;

}
