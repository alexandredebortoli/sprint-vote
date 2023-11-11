import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlayerEntity } from './player.entity';
import { TeamEntity } from './team.entity';
import * as crypto from 'crypto';
import { SharedProps } from './shared-props.helper';

@Entity('teams_players')
export class TeamsPlayersEntity extends SharedProps {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false, default: false })
  facilitator!: boolean;

  @ManyToOne(() => PlayerEntity, (player) => player.teamsPlayers)
  @JoinColumn({ name: 'player_id' })
  public player!: PlayerEntity;

  @ManyToOne(() => TeamEntity, (team) => team.teamsPlayers)
  @JoinColumn({ name: 'team_id' })
  public team!: TeamEntity;

  constructor(
    props: { player: PlayerEntity; team: TeamEntity; facilitator?: boolean },
    id?: string,
  ) {
    super();
    Object.assign(this, props);
    this.facilitator = props?.facilitator ?? false;
    this.id = id ?? crypto.randomUUID();
  }
}
