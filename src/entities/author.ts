import {Entity, Column, PrimaryGeneratedColumn} from "typeorm/browser";

@Entity('author')
export class Author {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({nullable: true})
    birthdate!: string;
}
