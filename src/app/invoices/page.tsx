import React from 'react';

export const dynamic = 'force-dynamic';
import { 
  Search, 
  Filter, 
  Plus,
  MoreVertical,
  Download,
  Mail,
  Eye
} from 'lucide-react';

export default function InvoicesPage() {
  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}>Invoices</h2>
          <p style={{ color: '#64748b' }}>Manage and track all your customer invoices.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline">
            <Download size={18} />
            Export CSV
          </button>
          <a href="/invoices/new" className="btn btn-primary">
            <Plus size={18} />
            New Invoice
          </a>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={18} />
            <input 
              type="text" 
              placeholder="Search by invoice number or client name..." 
              style={{ 
                width: '100%', 
                padding: '0.75rem 1rem 0.75rem 3rem', 
                border: '1px solid #e2e8f0', 
                borderRadius: '0.5rem',
                fontFamily: 'inherit'
              }} 
            />
          </div>
          <button className="btn btn-outline">
            <Filter size={18} />
            Filters
          </button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Client Name</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 'INV-2024-001', client: 'Tata Motors Ltd.', date: 'May 04, 2024', due: 'Jun 04, 2024', amount: '₹45,000.00', status: 'Paid' },
              { id: 'INV-2024-002', client: 'Tata Consultancy Services', date: 'May 02, 2024', due: 'Jun 02, 2024', amount: '₹12,500.00', status: 'Pending' },
              { id: 'INV-2024-003', client: 'Titan Company', date: 'Apr 28, 2024', due: 'May 28, 2024', amount: '₹67,000.00', status: 'Overdue' },
              { id: 'INV-2024-004', client: 'Tata Steel', date: 'Apr 25, 2024', due: 'May 25, 2024', amount: '₹23,000.00', status: 'Draft' },
              { id: 'INV-2024-005', client: 'Tata Consumer Products', date: 'Apr 22, 2024', due: 'May 22, 2024', amount: '₹89,000.00', status: 'Paid' },
            ].map((inv) => (
              <tr key={inv.id}>
                <td style={{ fontWeight: 600 }}>{inv.id}</td>
                <td>{inv.client}</td>
                <td>{inv.date}</td>
                <td>{inv.due}</td>
                <td>{inv.amount}</td>
                <td>
                  <span className={`badge badge-${inv.status.toLowerCase() === 'paid' ? 'success' : inv.status.toLowerCase() === 'pending' ? 'warning' : inv.status.toLowerCase() === 'overdue' ? 'danger' : 'secondary'}`}>
                    {inv.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <a href={`/invoices/${inv.id}`} style={{ color: '#005a9c', fontWeight: 500 }} title="View">
                      <Eye size={18} />
                      <span style={{ marginLeft: '0.25rem' }}>View Details</span>
                    </a>
                    <button style={{ color: '#64748b' }} title="Send Email"><Mail size={18} /></button>
                    <button style={{ color: '#64748b' }}><MoreVertical size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
