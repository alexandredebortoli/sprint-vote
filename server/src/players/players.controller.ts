import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ChangePlayerNameDto } from './dto/change-player-name.dto';
import { PlayerDto } from './dto/player.dto';

@ApiTags('players')
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The created player',
    type: PlayerDto,
  })
  @ApiConflictResponse({
    description: 'Username already taken',
  })
  create(@Body() createPlayerDto: CreatePlayerDto): Promise<PlayerDto> {
    return this.playersService.create(createPlayerDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The list of players',
    type: [PlayerDto],
  })
  findAll(): Promise<PlayerDto[]> {
    return this.playersService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found player',
    type: PlayerDto,
  })
  @ApiNotFoundResponse({
    description: 'The player was not found',
  })
  findOne(@Param('id') id: string): Promise<PlayerDto> {
    return this.playersService.findOne(id);
  }

  @Post(':id/change-name')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The player name has been successfully updated',
  })
  @ApiNotFoundResponse({
    description: 'The player was not found',
  })
  changeName(
    @Param('id') id: string,
    @Body() changePlayerNameDto: ChangePlayerNameDto,
  ): Promise<void> {
    return this.playersService.changeName(id, changePlayerNameDto);
  }
}
