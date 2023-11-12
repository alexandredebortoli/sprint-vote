import { ApiProperty } from '@nestjs/swagger';
import { TeamEntity } from 'src/database/entities/team.entity';

export class TeamDto {
  @ApiProperty({
    example: '1cf59158-07f8-4683-ab8c-7251322e6a0e',
    description: 'The id of the team',
  })
  id!: string;

  @ApiProperty({
    example: 'Team Hello World',
    description: 'The name of the team',
  })
  name!: string;

  constructor(partial: Partial<TeamEntity>) {
    partial.id && (this.id = partial.id);
    partial.name && (this.name = partial.name);
  }
}
