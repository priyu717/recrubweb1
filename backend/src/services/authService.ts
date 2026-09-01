import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const generateTokens = (userId: string, roleName: string, tenantId: string) => {
  const accessToken = jwt.sign(
    { userId, role: roleName, tenantId },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET || 'refresh_secret',
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

export const authService = {
  async register(data: any) {
    const { firstName, lastName, email, password, companyName } = data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('Email already exists');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Get or create Company Admin role
    let adminRole = await prisma.role.findUnique({ where: { name: 'COMPANY_ADMIN' } });
    if (!adminRole) {
      adminRole = await prisma.role.create({
        data: { name: 'COMPANY_ADMIN', permissions: ['*'] }
      });
    }

    // Create Company and User in a transaction
    const user = await prisma.$transaction(async (tx: any) => {
      const company = await tx.company.create({
        data: { name: companyName }
      });

      return tx.user.create({
        data: {
          firstName,
          lastName,
          email,
          passwordHash,
          roleId: adminRole.id,
          tenantId: company.id
        },
        include: { role: true, tenant: true }
      });
    });

    const tokens = generateTokens(user.id, user.role.name, user.tenantId);
    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role.name,
        company: user.tenant.name
      },
      ...tokens
    };
  },

  async login(data: any) {
    const { email, password } = data;

    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true, tenant: true }
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const tokens = generateTokens(user.id, user.role.name, user.tenantId);
    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role.name,
        company: user.tenant.name
      },
      ...tokens
    };
  },

  async getMe(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { role: true, tenant: true }
    });

    if (!user) throw new Error('User not found');

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role.name,
      company: user.tenant.name
    };
  }
};
