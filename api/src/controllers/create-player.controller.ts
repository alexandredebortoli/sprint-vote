import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common';

import { hash } from 'bcryptjs';
import { z } from 'zod';

import { ZodValidationPipe } from '@/pipes/zod-validation.pipe';

import { PrismaService } from '@/prisma/prisma.service';

const createPlayerBodySchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type CreatePlayerBodySchema = z.infer<typeof createPlayerBodySchema>;

@Controller('/players')
export class CreatePlayerController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createPlayerBodySchema))
  async handle(@Body() body: CreatePlayerBodySchema) {
    const { name, username, email, password } = body;

    const userWithSameUsername = await this.prisma.player.findUnique({
      where: { username },
    });

    if (userWithSameUsername) {
      throw new ConflictException('username_already_exists');
    }

    const userWithSameEmail = await this.prisma.player.findUnique({
      where: { email },
    });

    if (userWithSameEmail) {
      throw new ConflictException('email_already_exists');
    }

    const hashedPassword = await hash(password, 8);

    const newPlayer = await this.prisma.player.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });

    return newPlayer;
  }
}
