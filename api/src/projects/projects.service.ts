import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        name: dto.name,
        ownerId: userId,
      },
    });
  }

  async findAllForUser(userId: string) {
    return this.prisma.project.findMany({
      where: { ownerId: userId },
    });
  }

  async findOne(id: string, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project || project.ownerId !== userId) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async update(id: string, userId: string, dto: UpdateProjectDto) {
    await this.findOne(id, userId); // Ensure it exists and is owned by the user

    return this.prisma.project.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string, userId: string) {
    await this.findOne(id, userId); // Ensure it exists and is owned by the user

    return this.prisma.project.delete({
      where: { id },
    });
  }
}
