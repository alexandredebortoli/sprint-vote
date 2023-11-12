import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePlayerDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the player',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    example: 'johnDoe',
    description: 'The username of the player',
  })
  @IsString()
  username!: string;

  @ApiProperty({
    example: '123456',
    description: 'The password of the player',
  })
  @IsString()
  password!: string;
}
