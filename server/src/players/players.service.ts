import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { ChangePlayerNameDto } from './dto/change-player-name.dto';
import { PlayerEntity } from '../database/entities/player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerDto } from './dto/player.dto';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);

  constructor(
    @InjectRepository(PlayerEntity)
    private readonly playerRepository: Repository<PlayerEntity>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<PlayerDto> {
    this.logger.log(
      `Creating a new player, ${JSON.stringify(createPlayerDto)}`,
    );

    const invalidUsername = await this.playerRepository.exist({
      where: { username: createPlayerDto.username },
    });

    if (invalidUsername) {
      this.logger.error(`Username ${createPlayerDto.username} already taken`);
      throw new ConflictException('username_already_taken');
    }

    const newPlayer = new PlayerEntity(createPlayerDto);
    newPlayer.hashPassword();
    const createdPlayer = await this.playerRepository.save(newPlayer);
    return new PlayerDto(createdPlayer);
  }

  async findAll(): Promise<PlayerDto[]> {
    this.logger.log(`Finding all players`);
    const playersFound = await this.playerRepository.find();
    const playersFormatted = playersFound.map(
      (player) => new PlayerDto(player),
    );
    return playersFormatted;
  }

  async findOne(id: string): Promise<PlayerDto> {
    this.logger.log(`Finding player #${id}`);
    const player = await this.playerRepository.findOne({ where: { id } });

    if (!player) {
      this.logger.error(`Player #${id} not found`);
      throw new NotFoundException('player_not_found');
    }

    return new PlayerDto(player);
  }

  async changeName(
    id: string,
    changePlayerNameDto: ChangePlayerNameDto,
  ): Promise<void> {
    this.logger.log(`Changing name of player #${id}`);
    const player = await this.playerRepository.findOne({ where: { id } });

    if (!player) {
      this.logger.error(`Player #${id} not found`);
      throw new NotFoundException('player_not_found');
    }

    player.name = changePlayerNameDto.name;
    await this.playerRepository.save(player);
  }
}
