import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { CurrentPlayer } from '@/auth/current-player.decorator';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { TokenPayload } from '@/auth/jwt.strategy';

import { PrismaService } from '@/prisma/prisma.service';

@Controller('/teams/:id/players')
@UseGuards(JwtAuthGuard)
export class FetchTeamPlayersController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(
    @CurrentPlayer() user: TokenPayload,
    @Param('id') teamId: string,
  ) {
    const playerId = user.sub;

    const players = await this.prisma.teamPlayer.findMany({
      select: {
        player: {
          select: { id: true, name: true },
        },
      },
      where: {
        teamId,
      },
    });

    const formattedPlayers = players.map((player) => player.player);

    return formattedPlayers;
  }
}
