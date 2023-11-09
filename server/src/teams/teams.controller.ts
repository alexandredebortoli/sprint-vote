import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './entities/team.entity';
import { TeamsService } from './teams.service';
import { ApiNotFoundResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The created team',
    type: Team,
  })
  async create(@Body() createTeamDto: CreateTeamDto): Promise<Team> {
    return await this.teamsService.create(createTeamDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The list of teams',
    type: [Team],
  })
  async findAll(): Promise<Team[]> {
    return await this.teamsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found team',
    type: Team,
  })
  @ApiNotFoundResponse({
    description: 'The team was not found',
  })
  async findOne(@Param('id') id: string): Promise<Team> {
    return await this.teamsService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The team has been successfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'The team was not found',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.teamsService.remove(id);
  }
}
