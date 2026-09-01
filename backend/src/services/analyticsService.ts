import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const analyticsService = {
  async getDashboardMetrics(tenantId: string) {
    const [
      totalCandidates,
      totalClients,
      totalLeads,
      totalCalls,
      completedCalls,
      todayCalls,
      campaigns
    ] = await Promise.all([
      prisma.candidate.count({ where: { tenantId } }),
      prisma.client.count({ where: { tenantId } }),
      prisma.lead.count({ where: { tenantId } }),
      prisma.call.count({ where: { tenantId } }),
      prisma.call.count({ where: { tenantId, status: 'COMPLETED' } }),
      prisma.call.count({
        where: {
          tenantId,
          createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) }
        }
      }),
      prisma.campaign.count({ where: { tenantId, status: 'ACTIVE' } })
    ]);

    const conversionRate = totalCandidates > 0
      ? Math.round((completedCalls / totalCandidates) * 100)
      : 0;

    return {
      totalCandidates,
      totalClients,
      totalLeads,
      totalCalls,
      completedCalls,
      todayCalls,
      activeCampaigns: campaigns,
      conversionRate,
    };
  },

  async getCallsOverTime(tenantId: string, days: number = 7) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const calls = await prisma.call.findMany({
      where: {
        tenantId,
        createdAt: { gte: startDate }
      },
      select: {
        createdAt: true,
        status: true
      }
    });

    // Group by date
    const grouped: Record<string, { total: number; completed: number }> = {};
    for (let i = 0; i < days; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      grouped[key] = { total: 0, completed: 0 };
    }

    calls.forEach(call => {
      const key = call.createdAt.toISOString().split('T')[0];
      if (grouped[key]) {
        grouped[key].total++;
        if (call.status === 'COMPLETED') grouped[key].completed++;
      }
    });

    return Object.entries(grouped)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, data]) => ({ date, ...data }));
  },

  async getCandidateStatusBreakdown(tenantId: string) {
    const candidates = await prisma.candidate.groupBy({
      by: ['status'],
      where: { tenantId },
      _count: { id: true }
    });

    return candidates.map(c => ({ status: c.status, count: c._count.id }));
  }
};
