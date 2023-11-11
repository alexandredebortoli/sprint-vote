import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SharedProps } from './shared-props.helper';
import { hash } from 'bcryptjs';
import * as crypto from 'crypto';
import { TeamsPlayersEntity } from './teams-players.entity';

@Entity('players')
export class PlayerEntity extends SharedProps {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false, unique: true })
  username!: string;

  @Column({ nullable: false })
  password!: string;

  @OneToMany(() => TeamsPlayersEntity, (teamsPlayers) => teamsPlayers.player)
  teamsPlayers?: TeamsPlayersEntity[];

  constructor(
    props: { name: string; username: string; password: string },
    id?: string,
  ) {
    super();
    Object.assign(this, props);
    this.id = id ?? crypto.randomUUID();
  }

  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
