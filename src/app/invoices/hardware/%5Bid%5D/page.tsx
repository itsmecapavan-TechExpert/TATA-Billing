import React from 'react';
import prisma from '@/lib/prisma';
import { ArrowLeft, Cpu, Car, MapPin, Calendar } from 'lucide-react';

export default async function HardwareInvoiceDetailsPage({ params }: { params: { id: string } }) {
  const hwInvoice = await prisma.hardwareInvoice.findUnique({
    where: { id: params.id },
    include: {
      devices: {
        orderBy: { createdAt: 'asc' }
      }
    }
  });

  if (!hwInvoice) return <div>Invoice not found</div>;

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <a href="/invoices/hardware" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.875rem', marginBottom: '1rem' }}>
          <ArrowLeft size={16} /> Back to List
        </a>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>{hwInvoice.hwInvoiceNo}</h2>
            <p style={{ color: '#64748b' }}>Date: {new Date(hwInvoice.date).toLocaleDateString('en-GB')} | PO: {hwInvoice.tataPoNo}</p>
          </div>
          <div className="badge badge-success" style={{ padding: '0.5rem 1rem' }}>
            {hwInvoice.devices.length} Devices Registered
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {hwInvoice.devices.map((device) => (
          <div key={device.id} className="card" style={{ borderLeft: '4px solid #005a9c' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: '#005a9c' }}>
                <Cpu size={18} /> {device.deviceNo}
              </div>
              {device.fitmentDate ? (
                <span className="badge badge-success">Fitted</span>
              ) : (
                <span className="badge badge-warning">Pending Fitment</span>
              )}
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Car size={16} color="#64748b" /> 
                <span style={{ fontWeight: 600 }}>VIN:</span> {device.vinNo}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} color="#64748b" /> 
                <span style={{ fontWeight: 600 }}>City:</span> {device.installationCity || 'Unassigned'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={16} color="#64748b" /> 
                <span style={{ fontWeight: 600 }}>Fitment:</span> {device.fitmentDate ? new Date(device.fitmentDate).toLocaleDateString('en-GB') : 'Not Scheduled'}
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.4rem 0.6rem' }}>
                Update Fitment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
