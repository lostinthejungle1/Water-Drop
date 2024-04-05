import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    comment: 'nickname',
    default: '',
  })
  @IsNotEmpty()
  name: string;

  @Column({
    comment: 'description',
    default: '',
  })
  @IsNotEmpty()
  desc: string;

  @Column({
    comment: 'telephone',
    nullable: true,
  })
  tel: string;

  @Column({
    comment: 'password',
    nullable: true,
  })
  password: string;

  @Column({
    comment: 'account information',
    nullable: true,
  })
  account: string;
}
