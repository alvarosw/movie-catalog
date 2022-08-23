import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'movies' })
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('text')
  synopsis: string;

  @Column('varchar')
  image: string;

  @Column({ type: 'bool', default: true })
  released: boolean;
}
