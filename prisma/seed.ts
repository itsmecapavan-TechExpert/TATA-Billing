import { PrismaClient } from '@prisma/client';
import { neonConfig, Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

if (!process.env.DATABASE_URL) {
  console.error("❌ Error: DATABASE_URL is not defined in your .env file!");
  process.exit(1);
}

neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool as any);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding TATA PO items and Admin...');

  // 0. Create Default Admin
  await prisma.user.upsert({
    where: { email: 'itsmecapavan@gmail.com' },
    update: {},
    create: {
      email: 'itsmecapavan@gmail.com',
      name: 'Pavan Kumar',
      role: 'ADMIN',
      isApproved: true,
    }
  });

  // 1. Create Device Models
  const concox = await prisma.deviceModel.upsert({
    where: { name: 'Concox 4G' },
    update: {},
    create: { name: 'Concox 4G' }
  });

  const laf = await prisma.deviceModel.upsert({
    where: { name: 'LAF 4G' },
    update: {},
    create: { name: 'LAF 4G' }
  });

  // 2. Create City Tiers
  const tiers = ['Tier 1', 'Tier 2', 'Tier 3'];
  const tierIds: Record<string, string> = {};

  for (const t of tiers) {
    const tier = await prisma.cityTier.upsert({
      where: { name: t },
      update: {},
      create: { name: t }
    });
    tierIds[t] = tier.id;
  }

  // 3. Create Installation Rates (from spreadsheet)
  const rates = [
    { modelId: concox.id, tierId: tierIds['Tier 1'], rate: 450 },
    { modelId: concox.id, tierId: tierIds['Tier 2'], rate: 550 },
    { modelId: concox.id, tierId: tierIds['Tier 3'], rate: 650 },
    { modelId: laf.id, tierId: tierIds['Tier 1'], rate: 450 },
    { modelId: laf.id, tierId: tierIds['Tier 2'], rate: 550 },
    { modelId: laf.id, tierId: tierIds['Tier 3'], rate: 650 },
  ];

  for (const r of rates) {
    await prisma.installationRate.upsert({
      where: {
        deviceModelId_cityTierId: {
          deviceModelId: r.modelId,
          cityTierId: r.tierId
        }
      },
      update: { rate: r.rate },
      create: {
        deviceModelId: r.modelId,
        cityTierId: r.tierId,
        rate: r.rate
      }
    });
  }

  // 4. Create Standard Service Products
  const products = [
    { name: 'SIM Maintenance & KYC Fee', price: 150, hsn: '998313', partNo: 'SIM-KYC-001' },
    { name: 'Fitment Supporting Documentation', price: 100, hsn: '998311', partNo: 'DOC-FIT-001' },
    { name: 'Warranty Maintenance - Year 1', price: 200, hsn: '998713', partNo: 'WRNTY-Y1' },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { partNo: p.partNo },
      update: { basePrice: p.price },
      create: {
        name: p.name,
        basePrice: p.price,
        hsn: p.hsn,
        partNo: p.partNo
      }
    });
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
