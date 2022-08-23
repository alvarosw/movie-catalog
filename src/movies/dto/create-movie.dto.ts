import { OmitType } from '@nestjs/mapped-types';
import { MovieDto } from './movie.dto';

export class CreateMovieDto extends OmitType(MovieDto, ['id'] as const) {}
