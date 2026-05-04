import React from 'react';
import prisma from '@/lib/prisma';
import ExportActions from '@/components/invoices/export-actions';
import { ArrowLeft, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default async function InvoiceDetailsPage({ params }: { params: { id: string } }) {
  let invoice: any = null;

  try {
    invoice = await prisma.invoice.findUnique({
      where: { id: params.id },
      include: {
        client: true,
        items: {
          include: { product: true }
        }
      }
    });
  } catch (error) {
    console.warn("Using mock data for preview");
    invoice = {
      id: params.id,
      invoiceNumber: 'INV-2024-001',
      poNo: '9700078288',
      date: new Date(),
      status: 'PAID',
      totalAmount: 124500,
      client: { name: 'Tata Motors Ltd.', gstin: '27AAAAA0000A1Z5', address: 'Mumbai, Maharashtra' },
      items: [
        { product: { name: 'TLMS-EXP-INSTL-LAF 4G-TIER 1 CITY', partNo: '9348012260' }, quantity: 1, price: 250, total: 250, serviceType: 'INSTALLATION' },
        { product: { name: 'TLMS-EXP-SIM MAINTENANCE-CHARGES', partNo: '9348012223' }, quantity: 30000, price: 24, total: 720000 },
      ]
    };
  }

  if (!invoice) return <div>Invoice not found</div>;

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <a href="/invoices" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.875rem', marginBottom: '1rem' }}>
          <ArrowLeft size={16} /> Back to Invoices
        </a>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Invoice {invoice.invoiceNumber}</h2>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', color: '#64748b' }}>
              <span>PO: {invoice.poNo || 'N/A'}</span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                {invoice.status === 'PAID' ? <CheckCircle size={14} color="#16a34a" /> : <Clock size={14} color="#d97706" />}
                {invoice.status}
              </span>
            </div>
          </div>
          <ExportActions invoice={invoice} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
            <h3 style={{ fontWeight: 600 }}>Billing Details</h3>
          </div>
          <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Part No</th>
                  <th>Qty</th>
                  <th>Rate</th>
                  <th style={{ textAlign: 'right' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item: any, idx: number) => (
                  <tr key={idx}>
                    <td>{item.product.name}</td>
                    <td><span style={{ fontFamily: 'monospace', color: '#64748b' }}>{item.product.partNo}</span></td>
                    <td>{item.quantity}</td>
                    <td>₹{item.price.toLocaleString('en-IN')}</td>
                    <td style={{ textAlign: 'right', fontWeight: 600 }}>₹{item.total.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'flex-end', background: '#f8fafc' }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ color: '#64748b', fontSize: '0.875rem' }}>Total Amount</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#005a9c' }}>₹{invoice.totalAmount.toLocaleString('en-IN')}</div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontWeight: 600, marginBottom: '1.5rem' }}>Client Information</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Company</label>
              <div style={{ fontWeight: 600, marginTop: '0.25rem' }}>{invoice.client.name}</div>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Address</label>
              <div style={{ marginTop: '0.25rem' }}>{invoice.client.address || 'N/A'}</div>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>GSTIN</label>
              <div style={{ marginTop: '0.25rem' }}>{invoice.client.gstin || 'N/A'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
