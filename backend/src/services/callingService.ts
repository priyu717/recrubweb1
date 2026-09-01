import { PrismaClient } from '@prisma/client';
import { SimulatorCallingAdapter } from '../calling/callingAdapter';

const prisma = new PrismaClient();
const telephonyAdapter = new SimulatorCallingAdapter(); // Use simulator for MVP

export const callingService = {
  async initiate(tenantId: string, agentId: string, candidateId: string) {
    const candidate = await prisma.candidate.findFirst({ where: { id: candidateId, tenantId }});
    if (!candidate || !candidate.phone) {
      throw new Error('Candidate not found or missing phone number');
    }

    const { status } = await telephonyAdapter.initiateCall(candidate.phone);

    return prisma.call.create({
      data: {
        tenantId,
        agentId,
        candidateId,
        status: status // Starts as RINGING
      }
    });
  },

  async end(tenantId: string, callId: string, duration: number, disposition: string) {
    const call = await prisma.call.findFirst({ where: { id: callId, tenantId }});
    if (!call) throw new Error('Call not found');

    await telephonyAdapter.endCall(callId);

    return prisma.call.update({
      where: { id: callId },
      data: {
        status: 'COMPLETED',
        duration,
        disposition
      }
    });
  },

  async getCallHistory(tenantId: string) {
    return prisma.call.findMany({
      where: { tenantId },
      include: {
        candidate: { select: { firstName: true, lastName: true, phone: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }
};
