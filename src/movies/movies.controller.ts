import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieDto } from './dto/movie.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('movies')
@ApiTags('movie')
@ApiHeader({
  name: 'Authorization',
  description: 'Authorization Token',
  allowEmptyValue: false,
  required: true,
  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ...',
})
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiBadRequestResponse()
  @ApiCreatedResponse({
    type: () => CreateMovieDto,
    description: 'Filme Criado',
  })
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  @ApiOkResponse({
    type: () => MovieDto,
    isArray: true,
    description: 'Todos filmes existentes na base de dados',
  })
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: () => MovieDto,
    description: 'Filme com o id do input',
  })
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(+id);
  }

  @Put(':id')
  @ApiBadRequestResponse()
  @ApiOkResponse({
    type: () => CreateMovieDto,
    description: 'Filme atualizado',
  })
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
