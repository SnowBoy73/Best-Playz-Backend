import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClientEntity {
  @PrimaryColumn({ unique: true})
  public id: string;

  @Column({ unique: true })
  public nickname: string;
}
