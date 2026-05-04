import React from 'react';
import prisma from '@/lib/prisma';
import { FileText, Cpu, Calendar, ChevronRight } from 'lucide-react';

export default async function HardwareInvoicesPage() {
  const hwInvoices = await prisma.hardwareInvoice.findMany({
    include: {
      _count: {
        select: { devices: true }
      }
    },
    orderBy: { date: 'desc' }
  });

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Hardware Invoices (Tally Dump)</h2>
          <p style={{ color: '#64748b' }}>Summary of hardware devices received and fitment status.</p>
        </div>
        <a href="/bulk-import" className="btn btn-primary">
          Import from Tally
        </a>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>HW Invoice No</th>
              <th>Date</th>
              <th>Customer / Vendor</th>
              <th>Device Model</th>
              <th>Qty (Unique Devices)</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hwInvoices.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>No hardware invoices imported yet.</td></tr>
            ) : (
              hwInvoices.map((hw) => (
                <tr key={hw.id}>
                  <td style={{ fontWeight: 700, color: '#005a9c' }}>{hw.hwInvoiceNo}</td>
                  <td>{new Date(hw.date).toLocaleDateString('en-GB')}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{hw.ultimateCustomerName || 'N/A'}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>via {hw.vendorName}</div>
                  </td>
                  <td>
                    <span className="badge badge-secondary">{hw.deviceModel}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
                      <Cpu size={16} color="#64748b" /> {hw._count.devices}
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <a href={`/invoices/hardware/${hw.id}`} className="btn btn-outline" style={{ padding: '0.4rem 0.75rem', fontSize: '0.875rem' }}>
                      View Devices <ChevronRight size={16} />
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
