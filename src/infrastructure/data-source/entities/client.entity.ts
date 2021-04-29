import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClientEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public nickname: string;
}
