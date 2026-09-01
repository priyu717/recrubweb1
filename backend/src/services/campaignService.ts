import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const campaignService = {
  async getCampaigns(tenantId: string) {
    return prisma.campaign.findMany({
      where: { tenantId },
      include: {
        _count: { select: { candidates: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  },

  async createCampaign(tenantId: string, data: any) {
    return prisma.campaign.create({
      data: {
        ...data,
        tenantId
      }
    });
  },

  async addCandidateToCampaign(tenantId: string, campaignId: string, candidateId: string) {
    // Verify ownership
    const campaign = await prisma.campaign.findFirst({ where: { id: campaignId, tenantId }});
    const candidate = await prisma.candidate.findFirst({ where: { id: candidateId, tenantId }});
    
    if (!campaign || !candidate) {
      throw new Error('Campaign or Candidate not found in this tenant');
    }

    return prisma.campaignCandidate.create({
      data: {
        campaignId,
        candidateId
      }
    });
  },

  async getCampaignCandidates(tenantId: string, campaignId: string) {
    const campaign = await prisma.campaign.findFirst({ where: { id: campaignId, tenantId }});
    if (!campaign) throw new Error('Campaign not found');

    return prisma.campaignCandidate.findMany({
      where: { campaignId },
      include: {
        candidate: true
      }
    });
  }
};
