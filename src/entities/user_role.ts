import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import * as interfaces from "../interfaces";

@Entity({ schema: "demo" })
export default class UserRole implements interfaces.UserRole {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    roleId: number;

}
