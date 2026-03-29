import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/prisma.service';

require('dotenv').config();

describe('Prisma Database Scenarios (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get<PrismaService>(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    if (prisma) await prisma.$disconnect();
    if (app) await app.close();
  });

  describe('User Operations', () => {
    let testUserId: string;

    it('Scenario 1: Should connect and find zero or more users', async () => {
      const users = await prisma.user.findMany();
      expect(Array.isArray(users)).toBe(true);
    });

    it('Scenario 2: Should create a new user successfully', async () => {
      const email = `test-${Date.now()}@example.com`;
      const newUser = await prisma.user.create({
        data: {
          email,
          name: 'Test Setup User',
          passwordHash: 'dummyhash',
        },
      });
      
      expect(newUser).toBeDefined();
      expect(newUser.email).toBe(email);
      expect(newUser.id).toBeDefined();
      
      testUserId = newUser.id;
    });

    it('Scenario 3: Should retrieve the newly created user', async () => {
      const user = await prisma.user.findUnique({
        where: { id: testUserId }
      });
      expect(user).toBeDefined();
      expect(user?.name).toBe('Test Setup User');
    });

    it('Scenario 4: Should delete the test user to clean up', async () => {
      const deletedUser = await prisma.user.delete({
        where: { id: testUserId }
      });
      expect(deletedUser.id).toBe(testUserId);
    });
  });
});
