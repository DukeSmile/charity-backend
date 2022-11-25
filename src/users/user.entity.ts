// base.entity.ts
import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('id')
    public id: string;

    @Column({ type: 'varchar', unique: true, default: true })
    public wallet_address: string;

    @Column({ type: 'int'})
    public charity_type: number;

    @Column({ type: 'int'})
    public goal: number;

    @Column({ type: 'varchar'})
    public fund_type: string;

    @Column({ type: 'varchar', length: 100 })
    public name: string;

    @Column({ type: 'varchar', length: 100 })
    public title: string;

    @Column({ type: 'varchar' })
    public photo: string;

    @Column({ type: 'varchar', length: 100 })
    public country: string;

    @Column({ type: 'varchar', length: 100 })
    public location: string;

    @Column({ type: 'varchar', length: 100 })
    public email: string;

    @Column({ type: 'varchar', length: 100 })
    public summary: string;

    @Column({ type: 'varchar', length: 1000 })
    public detail: string;

    @Column({ type: 'varchar', length: 100 })
    public vip: string;

    @Column({ type: 'varchar', length: 100 })
    public website: string;

    @Column({ type: 'varchar', length: 100 })
    public phone: string;

    @Column({ type: 'varchar', length: 100 })
    public linkedin: string;

    @Column({ type: 'varchar', length: 100 })
    public twitter: string;

    @Column({ type: 'varchar', length: 100 })
    public facebook: string;

    @Column({ type: 'varchar', length: 100 })
    public instagram: string;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    public lastChangedDateTime: Date;

    @Column({ type: 'varchar', length: 300 })
    public lastChangedBy: string;

    @Column({ type: 'varchar', length: 300, nullable: true })
    public internalComment: string | null;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    public createDateTime: Date;
}