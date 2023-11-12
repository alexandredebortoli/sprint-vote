import { ApiProperty } from '@nestjs/swagger';
import { PlayerEntity } from 'src/database/entities/player.entity';

export class PlayerDto {
  @ApiProperty({
    example: '1cf59158-07f8-4683-ab8c-7251322e6a0e',
    description: 'The id of the player',
  })
  id!: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the player',
  })
  name!: string;

  @ApiProperty({
    example: 'JohnDoe',
    description: 'The username of the player',
  })
  username!: string;

  constructor(partial: Partial<PlayerEntity>) {
    partial.id && (this.id = partial.id);
    partial.name && (this.name = partial.name);
    partial.username && (this.username = partial.username);
  }
}
