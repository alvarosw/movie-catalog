import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Movie } from '../entities/movie.entity';

export class MovieDto {
  @IsString()
  id: Movie['id'];

  @IsString()
  @IsNotEmpty()
  name: Movie['name'];

  @IsString()
  synopsis: Movie['synopsis'];

  @IsString()
  image: Movie['image'];

  @IsBoolean()
  released: Movie['released'];
}
