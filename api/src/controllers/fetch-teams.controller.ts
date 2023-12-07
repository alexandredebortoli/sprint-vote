import { Controller, Get, UseGuards } from '@nestjs/common';

import { CurrentPlayer } from '@/auth/current-player.decorator';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { TokenPayload } from '@/auth/jwt.strategy';

import { PrismaService } from '@/prisma/prisma.service';

@Controller('/teams')
@UseGuards(JwtAuthGuard)
export class FetchTeamsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(@CurrentPlayer() user: TokenPayload) {
    const playerId = user.sub;

    const teams = await this.prisma.teamPlayer.findMany({
      select: {
        team: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      where: {
        playerId: playerId,
      },
    });

    const formattedTeams = teams.map((team) => team.team);

    return formattedTeams;
  }
}
