import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Team {
  @ApiProperty({
    example: '1cf59158-07f8-4683-ab8c-7251322e6a0e',
    description: 'The id of the team',
  })
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty({
    example: 'Team 1',
    description: 'The name of the team',
  })
  @Column()
  name!: string;

  @ApiProperty({
    example: new Date(),
    description: 'The creation date of the team',
  })
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    update: false,
  })
  createdAt?: Date;

  @ApiProperty({
    example: new Date(),
    description: 'The date of the last update of the team',
  })
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt?: Date;

  constructor(team: Team) {
    Object.assign(this, team);
  }
}
