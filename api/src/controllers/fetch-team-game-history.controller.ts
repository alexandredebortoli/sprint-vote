import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { CurrentPlayer } from '@/auth/current-player.decorator';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { TokenPayload } from '@/auth/jwt.strategy';

@Controller('/teams/:id/games')
@UseGuards(JwtAuthGuard)
export class FetchTeamGameHistoryController {
  constructor() {}

  @Get()
  async handle(
    @CurrentPlayer() user: TokenPayload,
    @Param('id') teamId: string,
  ) {
    return [];
  }
}
