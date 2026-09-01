import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const candidateService = {
  async getCandidates(tenantId: string, search?: string) {
    return prisma.candidate.findMany({
      where: {
        tenantId,
        ...(search ? {
          OR: [
            { firstName: { contains: search, mode: 'insensitive' } },
            { lastName: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } }
          ]
        } : {})
      },
      orderBy: { createdAt: 'desc' }
    });
  },

  async createCandidate(tenantId: string, data: any) {
    return prisma.candidate.create({
      data: {
        ...data,
        tenantId
      }
    });
  },

  async updateCandidate(tenantId: string, candidateId: string, data: any) {
    // Ensure the candidate belongs to the tenant
    const existing = await prisma.candidate.findFirst({
      where: { id: candidateId, tenantId }
    });
    
    if (!existing) throw new Error('Candidate not found');

    return prisma.candidate.update({
      where: { id: candidateId },
      data
    });
  },

  async deleteCandidate(tenantId: string, candidateId: string) {
    const existing = await prisma.candidate.findFirst({
      where: { id: candidateId, tenantId }
    });
    
    if (!existing) throw new Error('Candidate not found');

    return prisma.candidate.delete({
      where: { id: candidateId }
    });
  }
};
