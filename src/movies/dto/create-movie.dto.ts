import { OmitType } from '@nestjs/swagger';
import { MovieDto } from './movie.dto';

export class CreateMovieDto extends OmitType(MovieDto, ['id'] as const) {}
