import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ChangePlayerNameDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The new name of the player',
  })
  @IsString()
  name!: string;
}
