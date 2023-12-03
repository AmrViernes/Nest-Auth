import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity()
export class ReportEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    price: number;

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @DeleteDateColumn()
    deletedAt?: Date;
}