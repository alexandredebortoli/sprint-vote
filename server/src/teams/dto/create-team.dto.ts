import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({
    example: 'Team Hello World',
    description: 'The name of the team',
  })
  @IsString()
  name!: string;
}
