import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import * as interfaces from "../interfaces";

@Entity()
export default class UserRole extends BaseEntity implements interfaces.UserRole {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    roleId: number;

}
