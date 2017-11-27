import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import * as interfaces from "../interfaces";

@Entity()
export default class Role extends BaseEntity implements interfaces.Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}
