import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import * as interfaces from "../interfaces";

@Entity({ schema: "demo" })
export default class Role implements interfaces.Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}
