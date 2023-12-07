import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CurrentPlayer } from '@/auth/current-player.decorator';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { TokenPayload } from '@/auth/jwt.strategy';

import { PrismaService } from '@/prisma/prisma.service';
import { z } from 'zod';

const addPlayerBodySchema = z.object({
  username: z.string(),
});

type AddPlayerBodySchema = z.infer<typeof addPlayerBodySchema>;

@Controller('/teams/:id/players')
@UseGuards(JwtAuthGuard)
export class AddPlayerToTeamController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(
    @CurrentPlayer() user: TokenPayload,
    @Param('id') teamId: string,
    @Body() body: AddPlayerBodySchema,
  ) {
    const player = await this.prisma.player.findUnique({
      where: { username: body.username },
    });

    if (!player) {
      throw new NotFoundException('user_not_found');
    }

    const addPlayerToTeam = this.prisma.teamPlayer.create({
      data: {
        teamId: teamId,
        playerId: player.id,
      },
    });

    return addPlayerToTeam;
  }
}
