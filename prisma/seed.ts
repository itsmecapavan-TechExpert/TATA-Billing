import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
      // Password left blank as requested for first login
    }
  });

  // 1. Create Device Models
  const concox = await prisma.deviceModel.upsert({
    where: { name: 'CONCOX VL149-4G' },
    update: {},
    create: { name: 'CONCOX VL149-4G' },
  });

  const laf = await prisma.deviceModel.upsert({
    where: { name: 'LAF 4G' },
    update: {},
    create: { name: 'LAF 4G' },
  });

  // 2. Create City Tiers
  const tier1 = await prisma.cityTier.upsert({ where: { name: 'Tier 1' }, update: {}, create: { name: 'Tier 1' } });
  const tier2 = await prisma.cityTier.upsert({ where: { name: 'Tier 2' }, update: {}, create: { name: 'Tier 2' } });
  const tier3 = await prisma.cityTier.upsert({ where: { name: 'Tier 3' }, update: {}, create: { name: 'Tier 3' } });

  // 3. Create Products / Services from PO
  const poItems = [
    { name: 'TLMS-EXP-SIM MAINTENANCE-CHARGES', partNo: '9348012223', basePrice: 24 },
    { name: 'TLMS-EXP-CUSTOMER KYC-EA', partNo: '9348012224', basePrice: 35 },
    { name: 'TLMS-EXP-PRE-INSPECTION (Y CONNECTOR)-CHG', partNo: '9348012225', basePrice: 390 },
    { name: 'TLMS-EXP-DEVICE-SHIPMENT-EA', partNo: '9348012226', basePrice: 1 },
    { name: 'TLMS-EXP-DEVICE MAINTENANCE-LAF 4G', partNo: '9348012227', basePrice: 325 },
    { name: 'TLMS-EXP-EXTND-WRNTY-1ST YR', partNo: '9348012228', basePrice: 200 },
    { name: 'TLMS-EXP-EXTND-WRNTY-2ND YR', partNo: '9348012229', basePrice: 280 },
    { name: 'TLMS-EXP-GPRS-200MB-SIMACTIVATION', partNo: '9348012222', basePrice: 336 },
  ];

  for (const item of poItems) {
    await prisma.product.upsert({
      where: { partNo: item.partNo },
      update: { basePrice: item.basePrice, name: item.name },
      create: { name: item.name, partNo: item.partNo, basePrice: item.basePrice },
    });
  }

  // 4. Create Tiered Installation Rates
  const installationRates = [
    // LAF 4G
    { deviceId: laf.id, tierId: tier1.id, rate: 250, partNo: '9348012260', name: 'TLMS-EXP-INSTL-LAF 4G-TIER 1 CITY' },
    { deviceId: laf.id, tierId: tier2.id, rate: 350, partNo: '9348012261', name: 'TLMS-EXP-INST-LAF 4G-TIER 2 CITY' },
    { deviceId: laf.id, tierId: tier3.id, rate: 450, partNo: '9348012262', name: 'TLMS-EXP-INST-LAF 4G-TIER 3 CITY' },
    // Concox
    { deviceId: concox.id, tierId: tier1.id, rate: 200, partNo: '9348012263', name: 'TLMS-EXP-INST-CONCOX VL149-4G-TIER1 CITY' },
    { deviceId: concox.id, tierId: tier2.id, rate: 300, partNo: '9348012264', name: 'TLMS-EXP-INST-CONCOX VL149-4G-TIER2 CITY' },
    { deviceId: concox.id, tierId: tier3.id, rate: 400, partNo: '9348012265', name: 'TLMS-EXP-INST-CONCOX VL149-4G-TIER3 CITY' },
  ];

  for (const rate of installationRates) {
    await prisma.installationRate.upsert({
      where: { deviceModelId_cityTierId: { deviceModelId: rate.deviceId, cityTierId: rate.tierId } },
      update: { rate: rate.rate },
      create: { deviceModelId: rate.deviceId, cityTierId: rate.tierId, rate: rate.rate },
    });

    // Also add as products for manual selection
    await prisma.product.upsert({
      where: { partNo: rate.partNo },
      update: { basePrice: rate.rate, name: rate.name },
      create: { name: rate.name, partNo: rate.partNo, basePrice: rate.rate },
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
