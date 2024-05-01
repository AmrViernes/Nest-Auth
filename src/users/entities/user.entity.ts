import { ReportEntity } from "src/reports/entities/report.entity";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ length: 50 })
    email: string

    @Column({ length: 128 })
    password: string

    // Normal User Role = 1, Admin User Role = 2
    @Column({default: 1})
    role: number

    @OneToMany(() => ReportEntity, report => report.user)
    reports: ReportEntity[]

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @DeleteDateColumn()
    deletedAt?: Date;
}