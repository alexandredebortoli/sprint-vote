import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeamsService {
  private readonly logger = new Logger(TeamsService.name);

  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async create(createPlayerDto: CreateTeamDto): Promise<Team> {
    this.logger.log(`Creating a new team, ${JSON.stringify(createPlayerDto)}`);
    const team = new Team(createPlayerDto);
    return await this.teamRepository.save(team);
  }

  async findAll(): Promise<Team[]> {
    this.logger.log(`Finding all teams`);
    return await this.teamRepository.find();
  }

  async findOne(id: string): Promise<Team> {
    this.logger.log(`Finding team #${id}`);
    const team = await this.teamRepository.findOne({ where: { id } });

    if (!team) {
      const errorMessage = `Team #${id} not found`;
      this.logger.error(errorMessage);
      throw new NotFoundException(errorMessage);
    }

    return team;
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Removing team #${id}`);
    const team = await this.teamRepository.findOne({ where: { id } });

    if (!team) {
      const errorMessage = `Team #${id} not found`;
      this.logger.error(errorMessage);
      throw new NotFoundException(errorMessage);
    }

    await this.teamRepository.delete(team);
  }
}
