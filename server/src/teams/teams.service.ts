import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamEntity } from '../database/entities/team.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamDto } from './dto/team.dto';

@Injectable()
export class TeamsService {
  private readonly logger = new Logger(TeamsService.name);

  constructor(
    @InjectRepository(TeamEntity)
    private readonly teamRepository: Repository<TeamEntity>,
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<TeamDto> {
    this.logger.log(`Creating a new team, ${JSON.stringify(createTeamDto)}`);

    const newTeam = new TeamEntity(createTeamDto);
    const createdTeam = await this.teamRepository.save(newTeam);
    return new TeamDto(createdTeam);
  }

  async findAll(): Promise<TeamDto[]> {
    this.logger.log(`Finding all teams`);
    const teamsFound = await this.teamRepository.find();
    const teamsFormatted = teamsFound.map((team) => new TeamDto(team));
    return teamsFormatted;
  }

  async findOne(id: string): Promise<TeamDto> {
    this.logger.log(`Finding team #${id}`);
    const team = await this.teamRepository.findOne({ where: { id } });

    if (!team) {
      this.logger.error(`Team #${id} not found`);
      throw new NotFoundException('team_not_found');
    }

    return new TeamDto(team);
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Removing team #${id}`);
    const team = await this.teamRepository.findOne({
      where: { id },
    });

    if (!team) {
      this.logger.error(`Team #${id} not found`);
      throw new NotFoundException('team_not_found');
    }

    // Todo: Safely delete teamsPlayers before deleting team
    // await this.teamRepository.delete(team as TeamEntity);
  }
}
