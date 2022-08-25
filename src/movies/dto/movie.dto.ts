import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Movie } from '../entities/movie.entity';

export class MovieDto {
  @ApiProperty({
    description: 'Id do filme',
    type: Number,
    example: 1,
  })
  id: Movie['id'];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome do filme',
    type: String,
    example: 'Velozes e Furiosos',
  })
  name: Movie['name'];

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Sinopse do filme',
    type: String,
    example:
      "Brian O'Conner é um policial que se infiltra no submundo dos rachas de rua para investigar uma série de furtos. Enquanto tenta ganhar o respeito e a confiança do líder Dom Toretto, ele corre o risco de ser desmascarado.",
  })
  synopsis: Movie['synopsis'];

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Url para uma imagem do filme',
    type: String,
    example: 'https://s1.fileditch.ch/gKnvxwZoLmmBLSDDKub.webp',
  })
  image: Movie['image'];

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description:
      'Propriedade Lançamento. Se o filme foi lançado, verdadeiro, se não, falso',
    type: Boolean,
    example: true,
  })
  released: Movie['released'];
}
