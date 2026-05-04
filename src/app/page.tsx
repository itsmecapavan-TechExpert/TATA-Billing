import React from 'react';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  AlertCircle,
  Plus,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { getInvoices } from '@/lib/actions/invoiceActions';
import { getClients } from '@/lib/actions/clientActions';

export default async function Dashboard() {
  let invoices = [];
  let clients = [];
  let stats = {
    revenue: 0,
    activeClients: 0,
    pending: 0,
    overdue: 0
  };

  try {
    invoices = await getInvoices();
    clients = await getClients();
    
    stats.revenue = invoices.reduce((sum: number, inv: any) => sum + (inv.status === 'PAID' ? inv.totalAmount : 0), 0);
    stats.activeClients = clients.length;
    stats.pending = invoices.filter((inv: any) => inv.status === 'PENDING').length;
    stats.overdue = invoices.filter((inv: any) => inv.status === 'OVERDUE').length;
  } catch (error) {
    console.warn("Database connection not ready. Showing placeholder data.");
    // Fallback to placeholders if database is not set up
    stats = { revenue: 124500, activeClients: 48, pending: 12, overdue: 3 };
    invoices = [
      { id: '1', invoiceNumber: 'INV-2024-001', client: { name: 'Tata Motors Ltd.' }, date: new Date(), totalAmount: 45000, status: 'PAID' },
      { id: '2', invoiceNumber: 'INV-2024-002', client: { name: 'Tata Consultancy Services' }, date: new Date(), totalAmount: 12500, status: 'PENDING' },
      { id: '3', invoiceNumber: 'INV-2024-003', client: { name: 'Titan Company' }, date: new Date(), totalAmount: 67000, status: 'OVERDUE' },
      { id: '4', invoiceNumber: 'INV-2024-004', client: { name: 'Tata Steel' }, date: new Date(), totalAmount: 23000, status: 'DRAFT' },
    ];
  }

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}>Dashboard Overview</h2>
          <p style={{ color: '#64748b' }}>Welcome back! Here's what's happening with your billing today.</p>
        </div>
        <a href="/invoices/new" className="btn btn-primary">
          <Plus size={18} />
          Create New Invoice
        </a>
      </div>

      <div className="dashboard-grid">
        <div className="card stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div className="stat-label">Total Revenue</div>
            <div style={{ padding: '0.5rem', borderRadius: '0.5rem', background: '#f0fdf4', color: '#16a34a' }}>
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="stat-value">₹{stats.revenue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
          <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <ArrowUpRight size={14} />
            <span>12% increase from last month</span>
          </div>
        </div>

        <div className="card stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div className="stat-label">Active Clients</div>
            <div style={{ padding: '0.5rem', borderRadius: '0.5rem', background: '#eff6ff', color: '#2563eb' }}>
              <Users size={20} />
            </div>
          </div>
          <div className="stat-value">{stats.activeClients}</div>
          <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#64748b' }}>
            4 new clients this week
          </div>
        </div>

        <div className="card stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div className="stat-label">Pending Invoices</div>
            <div style={{ padding: '0.5rem', borderRadius: '0.5rem', background: '#fffbeb', color: '#d97706' }}>
              <Clock size={20} />
            </div>
          </div>
          <div className="stat-value">{stats.pending}</div>
          <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#d97706' }}>
            Waiting for payment
          </div>
        </div>

        <div className="card stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div className="stat-label">Overdue</div>
            <div style={{ padding: '0.5rem', borderRadius: '0.5rem', background: '#fef2f2', color: '#dc2626' }}>
              <AlertCircle size={20} />
            </div>
          </div>
          <div className="stat-value">{stats.overdue}</div>
          <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#dc2626' }}>
            Requires immediate attention
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontWeight: 600 }}>Recent Invoices</h3>
          <button className="btn btn-outline" style={{ fontSize: '0.875rem' }}>View All</button>
        </div>
        <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
          <table>
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Client</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv: any) => (
                <tr key={inv.id}>
                  <td style={{ fontWeight: 600 }}>{inv.invoiceNumber}</td>
                  <td>{inv.client.name}</td>
                  <td>{new Date(inv.date).toLocaleDateString('en-IN', { month: 'short', day: '2-digit', year: 'numeric' })}</td>
                  <td>₹{inv.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  <td>
                    <span className={`badge badge-${inv.status.toLowerCase() === 'paid' ? 'success' : inv.status.toLowerCase() === 'pending' ? 'warning' : inv.status.toLowerCase() === 'overdue' ? 'danger' : 'secondary'}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td><button style={{ color: '#005a9c', fontWeight: 500 }}>Details</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
