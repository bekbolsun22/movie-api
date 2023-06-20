import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AppResponse, MovieDto } from './app.dto';
import { MovieDocument } from './schemas';

@Controller('movies')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(
    @Req() req,
    @Body() data: MovieDto,
  ): Promise<AppResponse<MovieDocument>> {
    if (!req.headers['userid']) {
      throw new ForbiddenException(
        'Апей кокуй UserID header ди кошуп жонотуш керек да. Унутуп калдынбы?',
      );
    }

    return this.appService.create(data, req.headers['userid']);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() data: MovieDto,
  ): Promise<AppResponse<MovieDocument>> {
    if (!req.headers['userid']) {
      throw new ForbiddenException(
        'Апей кокуй UserID header ди кошуп жонотуш керек да. Унутуп калдынбы?',
      );
    }

    return this.appService.update(data, id);
  }

  @Get(':id')
  getById(
    @Param('id') id: string,
    @Req() req,
  ): Promise<AppResponse<MovieDocument>> {
    if (!req.headers['userid']) {
      throw new ForbiddenException(
        'Апей кокуй UserID header ди кошуп жонотуш керек да. Унутуп калдынбы?',
      );
    }
    return this.appService.getById(id);
  }

  @Delete(':id')
  delete(
    @Param('id') id: string,
    @Req() req,
  ): Promise<AppResponse<MovieDocument>> {
    if (!req.headers['userid']) {
      throw new ForbiddenException(
        'Апей кокуй UserID header ди кошуп жонотуш керек да. Унутуп калдынбы?',
      );
    }
    return this.appService.delete(id);
  }

  @Get()
  getAll(@Req() req): Promise<AppResponse<MovieDocument[]>> {
    if (!req.headers['userid']) {
      throw new ForbiddenException(
        'Апей кокуй UserID header ди кошуп жонотуш керек да. Унутуп калдынбы?',
      );
    }

    return this.appService.getAll(req.headers['userid']);
  }
}
