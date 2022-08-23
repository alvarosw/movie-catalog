import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from 'src/movies/entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private readonly repository: Repository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    const movie = await this.repository.save(createMovieDto);
    delete movie.id;

    return movie;
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    await this.repository.update(id, updateMovieDto);

    const movie = await this.repository.findOne({ where: { id } });
    delete movie.id;

    return movie;
  }

  async remove(id: number) {
    await this.repository.delete({ id });

    return { deleted: true };
  }
}
