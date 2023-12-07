import {
  BadRequestException,
  Controller,
  Delete,
  Logger,
  Param,
  UseGuards,
} from '@nestjs/common';

import { CurrentPlayer } from '@/auth/current-player.decorator';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { TokenPayload } from '@/auth/jwt.strategy';

import { PrismaService } from '@/prisma/prisma.service';

@Controller('/teams/:teamId/players/:playerId')
@UseGuards(JwtAuthGuard)
export class RemovePlayerFromTeamController {
  constructor(private prisma: PrismaService) {}

  @Delete()
  async handle(
    @CurrentPlayer() user: TokenPayload,
    @Param('teamId') teamId: string,
    @Param('playerId') playerId: string,
  ) {
    if (playerId === user.sub) {
      throw new BadRequestException('cannot_remove_self');
    }

    const teamPlayer = await this.prisma.teamPlayer.findFirst({
      where: {
        teamId,
        playerId,
      },
    });

    if (!teamPlayer) {
      throw new BadRequestException('player_not_in_team');
    }

    await this.prisma.teamPlayer.delete({
      where: {
        playerId_teamId: {
          playerId: teamPlayer.playerId,
          teamId: teamPlayer.teamId,
        },
      },
    });
  }
}
