import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppResponse, MovieDto } from './app.dto';
import { Movie, MovieDocument } from './schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {}
  async create(
    data: MovieDto,
    userId: string,
  ): Promise<AppResponse<MovieDocument>> {
    try {
      const movie = new this.movieModel({
        ...data,
        userId: userId,
      });
      await movie.save();

      return { data: movie, message: 'Movie successfully created.' };
    } catch (error) {
      throw error;
    }
  }

  async update(
    data: MovieDto,
    id: string,
  ): Promise<AppResponse<MovieDocument>> {
    try {
      await this.movieModel.findByIdAndUpdate(id, data);

      return {
        data: await this.movieModel.findById(id),
        message: 'Movie successfully updated.',
      };
    } catch (error) {
      throw error;
    }
  }

  async getAll(userId: string): Promise<AppResponse<MovieDocument[]>> {
    try {
      const movies = await this.movieModel.find({ userId }).exec();
      return { data: movies };
    } catch (error) {
      throw error;
    }
  }

  async getById(id: string): Promise<AppResponse<MovieDocument>> {
    try {
      const doc = await this.movieModel.findById(id);

      if (!doc) {
        throw new HttpException(
          'Апей кокцуй, мындай id менен кино табылган жок.',
          HttpStatus.NOT_FOUND,
        );
      }

      return { data: doc };
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<AppResponse> {
    try {
      const doc = await this.movieModel.findByIdAndDelete(id);

      if (!doc) {
        throw new HttpException(
          'Апей кокцуй, мындай id менен кино табылган жок.',
          HttpStatus.NOT_FOUND,
        );
      }

      return { message: 'Movie successfully deleted.' };
    } catch (error) {
      throw error;
    }
  }
}
