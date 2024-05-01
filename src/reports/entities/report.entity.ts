import { UserEntity } from "src/users/entities/user.entity";
import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from "typeorm";

@Entity()
export class ReportEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({default: false})
    approved: boolean

    @Column()
    make: string

    @Column()
    model: string

    @Column()
    year: number

    @Column()
    kilometers: number

    @Column()
    lat: number

    @Column()
    lang: number 
    
    @Column()
    price: number;

    @ManyToOne(() => UserEntity, user => user.reports)
    user: UserEntity

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @DeleteDateColumn()
    deletedAt?: Date;
}