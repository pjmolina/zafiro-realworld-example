import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import * as interfaces from "../interfaces";
import User from "./user";
import Role from "./role";

@Entity({ schema: "demo" })
export default class UserRole implements interfaces.UserRole {

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(type => User, user => user.id)
    public user: User;

    @ManyToOne(type => Role, role => role.id)
    public role: Role;

}
