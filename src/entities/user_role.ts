import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import * as interfaces from "../interfaces";
import User from "./user";

@Entity({ schema: "demo" })
export default class UserRole implements interfaces.UserRole {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.id)
    userId: number;

    @ManyToOne(type => User, user => user.id)
    roleId: number;

}
