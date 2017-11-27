import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import * as interfaces from "../interfaces";

@Entity({ schema: "demo" })
export default class User implements interfaces.User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    enabled: boolean;

}
