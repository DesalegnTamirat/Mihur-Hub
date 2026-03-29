import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(data: { email: string; name?: string; passwordPlain: string }): Promise<Omit<User, 'passwordHash'>> {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(data.passwordPlain, saltRounds);

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        passwordHash,
      },
    });

    const { passwordHash: _, ...result } = user;
    return result;
  }
}
