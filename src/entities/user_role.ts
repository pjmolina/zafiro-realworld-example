import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import * as interfaces from "../interfaces";
import User from "./user";

@Entity({ schema: "demo" })
export default class UserRole implements interfaces.UserRole {

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(type => User, user => user.id)
    public userId: number;

    @ManyToOne(type => User, user => user.id)
    public roleId: number;

}
