import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import * as interfaces from "../interfaces";

@Entity({ schema: "demo" })
export default class User implements interfaces.User {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public email: string;

    @Column()
    public givenName: string;

    @Column()
    public familyName: string;

    @Column()
    public isBanned: boolean;

}
