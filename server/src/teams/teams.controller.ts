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
import { ApiNotFoundResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TeamsService } from './teams.service';
import { TeamDto } from './dto/team.dto';
import { CreateTeamDto } from './dto/create-team.dto';

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The created team',
    type: TeamDto,
  })
  create(@Body() createTeamDto: CreateTeamDto): Promise<TeamDto> {
    return this.teamsService.create(createTeamDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The list of teams',
    type: [TeamDto],
  })
  findAll(): Promise<TeamDto[]> {
    return this.teamsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found team',
    type: TeamDto,
  })
  @ApiNotFoundResponse({
    description: 'The team was not found',
  })
  findOne(@Param('id') id: string): Promise<TeamDto> {
    return this.teamsService.findOne(id);
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
