import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SharedProps } from './shared-props.helper';
import * as crypto from 'crypto';
import { TeamsPlayersEntity } from './teams-players.entity';

@Entity('teams')
export class TeamEntity extends SharedProps {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false })
  name!: string;

  @OneToMany(() => TeamsPlayersEntity, (teamsPlayers) => teamsPlayers.team)
  teamsPlayers?: TeamsPlayersEntity[];

  constructor(props: { name: string }, id?: string) {
    super();
    Object.assign(this, props);
    this.id = id ?? crypto.randomUUID();
  }
}
