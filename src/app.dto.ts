import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class MovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @IsNotEmpty()
  @Min(1)
  @Max(5)
  @IsNumber()
  rating: number;
}

export interface AppResponse<T = any> {
  message?: string;
  status?: number;
  data?: T;
  total?: number;
}

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}
