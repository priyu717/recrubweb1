import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const userService = {
  async getUsersByTenant(tenantId: string) {
    return prisma.user.findMany({
      where: { tenantId },
      // ❌ include hata diya
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        role: {
          select: { name: true }
        }
      }
    });
  },

  async createUser(tenantId: string, data: any) {
    const { firstName, lastName, email, roleName, password } = data;
    
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error('Email already exists');

    const role = await prisma.role.findUnique({ where: { name: roleName } });
    if (!role) throw new Error('Role not found');

    const passwordHash = await bcrypt.hash(password, 10);

    return prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        passwordHash,
        roleId: role.id,
        tenantId
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: {
          select: { name: true }
        }
      }
    });
  },
  
  async getRoles() {
    return prisma.role.findMany({ select: { id: true, name: true } });
  }
};
