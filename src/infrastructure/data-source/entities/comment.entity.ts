import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public highscoreId: string;

  @Column()
  public text: string;

  @Column()
  public sender: string; // Was a Client entity in Comment. BAD

  @Column()
  public posted: string;
}
