import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import * as interfaces from "../interfaces";

@Entity()
export  default class User extends BaseEntity implements interfaces.User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    enabled: boolean;

}
