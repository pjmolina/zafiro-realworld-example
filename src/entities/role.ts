import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import * as interfaces from "../interfaces";

@Entity({ schema: "demo" })
export default class Role extends BaseEntity implements interfaces.Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}
