import React from 'react';
import InvoiceForm from '@/components/invoices/invoice-form';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function NewInvoicePage() {
  let clients = [];
  let devices = [];
  let tiers = [];
  let rates = [];

  try {
    clients = await prisma.client.findMany();
    devices = await prisma.deviceModel.findMany();
    tiers = await prisma.cityTier.findMany();
    rates = await prisma.installationRate.findMany();
  } catch (error) {
    console.warn("Database not ready for New Invoice page. Using mock data.");
    // Mock data for preview
    clients = [{ id: '1', name: 'Tata Motors' }];
    devices = [{ id: 'd1', name: 'Concox 4G' }, { id: 'd2', name: 'LAF 4G' }];
    tiers = [{ id: 't1', name: 'Tier 1' }, { id: 't2', name: 'Tier 2' }, { id: 't3', name: 'Tier 3' }];
    rates = [
      { deviceModelId: 'd1', cityTierId: 't1', rate: 500 },
      { deviceModelId: 'd1', cityTierId: 't2', rate: 700 },
      { deviceModelId: 'd2', cityTierId: 't1', rate: 600 },
    ];
  }

  return (
    <div className="container" style={{ paddingTop: '1rem' }}>
      <InvoiceForm 
        clients={clients} 
        devices={devices} 
        tiers={tiers} 
        rates={rates} 
      />
    </div>
  );
}
