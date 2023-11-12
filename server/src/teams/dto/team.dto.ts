import { ApiProperty } from '@nestjs/swagger';

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
}
