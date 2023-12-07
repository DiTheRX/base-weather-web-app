import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {AuthenticationModel} from "../authentication/authentication.model";


@Entity('actions')
export class WeatherModel {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @ManyToOne(() => AuthenticationModel)
    @JoinColumn({ name: 'userId' })
    user: AuthenticationModel;

    @Column({ name: 'userId'})
    public user_id: string;


    @Column('bigint')
    public action_time: number;

    @Column()
    public request_result: number;

    @Column({ nullable: true , type: "double precision" })
    public temp_c: number  | null;

}