import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity('user-authentications')
export class AuthenticationModel {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ unique: true })
    @Column()
    public login: string;

    @Column()
    public salt: string;

    @Column()
    public hash: string;

    @Column()
    public fio: string;

    @Column()
    public apiToken: string;
}