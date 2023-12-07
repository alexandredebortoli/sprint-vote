import {
  Body,
  ConflictException,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';

import { z } from 'zod';

import { CurrentPlayer } from '@/auth/current-player.decorator';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { TokenPayload } from '@/auth/jwt.strategy';

import { ZodValidationPipe } from '@/pipes/zod-validation.pipe';

import { PrismaService } from '@/prisma/prisma.service';

const createTeamBodySchema = z.object({
  name: z.string(),
});

type CreateTeamBodySchema = z.infer<typeof createTeamBodySchema>;

@Controller('/teams')
@UseGuards(JwtAuthGuard)
export class CreateTeamController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(
    @CurrentPlayer() user: TokenPayload,
    @Body(new ZodValidationPipe(createTeamBodySchema))
    body: CreateTeamBodySchema,
  ) {
    const { name } = body;

    const playerTeamWithSameName = await this.prisma.teamPlayer.findMany({
      where: {
        playerId: user.sub,
        team: {
          name: name,
        },
      },
      include: {
        team: false,
      },
    });

    if (playerTeamWithSameName.length !== 0) {
      throw new ConflictException('team_already_exists');
    }

    const newTeam = await this.prisma.team.create({
      data: {
        name,
        teamPlayers: {
          create: [
            {
              playerId: user.sub,
            },
          ],
        },
      },
    });

    return newTeam;
  }
}
