import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create default roles
  const roles = ['SUPER_ADMIN', 'COMPANY_ADMIN', 'RECRUITER', 'AGENT'];
  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: { name: roleName, permissions: ['*'] }
    });
  }
  console.log('✅ Roles created');

  // Create default subscription plans
  const plans = [
    { name: 'FREE', maxUsers: 3, maxCandidates: 50, maxCallsPerMonth: 100, maxCampaigns: 2, priceMonthly: 0, features: ['Basic CRM', 'Call Simulator'] },
    { name: 'STARTER', maxUsers: 10, maxCandidates: 500, maxCallsPerMonth: 1000, maxCampaigns: 10, priceMonthly: 29, features: ['CRM', 'Calling', 'AI Analysis'] },
    { name: 'PRO', maxUsers: 30, maxCandidates: 5000, maxCallsPerMonth: 10000, maxCampaigns: 50, priceMonthly: 99, features: ['CRM', 'Calling', 'AI Analysis', 'Advanced Analytics', 'Priority Support'] },
    { name: 'ENTERPRISE', maxUsers: 999, maxCandidates: 999999, maxCallsPerMonth: 999999, maxCampaigns: 999, priceMonthly: 499, features: ['Unlimited Everything', 'Custom Integrations', 'Dedicated Support'] },
  ];

  for (const plan of plans) {
    await prisma.subscriptionPlan.upsert({
      where: { name: plan.name },
      update: {},
      create: plan
    });
  }
  console.log('✅ Subscription plans created');

  // Create a demo company and admin
  const adminRole = await prisma.role.findUnique({ where: { name: 'COMPANY_ADMIN' } });
  if (!adminRole) throw new Error('Admin role not found');

  let demoCompany = await prisma.company.findFirst({ where: { name: 'Demo Recruitment Agency' } });
  if (!demoCompany) {
    demoCompany = await prisma.company.create({
      data: { name: 'Demo Recruitment Agency', domain: 'demo.aicrm.io' }
    });
  }

  const existingAdmin = await prisma.user.findUnique({ where: { email: 'admin@demo.aicrm.io' } });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('Admin@123', 10);
    await prisma.user.create({
      data: {
        firstName: 'Demo',
        lastName: 'Admin',
        email: 'admin@demo.aicrm.io',
        passwordHash,
        roleId: adminRole.id,
        tenantId: demoCompany.id
      }
    });
    console.log('✅ Demo admin created: admin@demo.aicrm.io / Admin@123');
  }

  console.log('🎉 Seed complete!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
