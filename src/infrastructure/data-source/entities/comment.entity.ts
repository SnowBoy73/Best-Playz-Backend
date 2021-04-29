import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public highscoreId: string;

  @Column()
  public text: string;

  @Column()
  public sender: string; // Maybe a Client entity??

  @Column()
  public posted: string;
}
