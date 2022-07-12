import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Career {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  position: string;

  @Column()
  contract: string;

  @Column()
  group: string;

  @Column()
  stack: string;

  @Column()
  content: string;
}
