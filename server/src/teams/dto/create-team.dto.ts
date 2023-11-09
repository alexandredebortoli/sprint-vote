import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({ example: 'Team 1', description: 'The name of the Team' })
  @IsString()
  readonly name!: string;
}
