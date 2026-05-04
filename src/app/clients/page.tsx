import React from 'react';
import { getClients, deleteClient } from '@/lib/actions/clientActions';
import { 
  Users, 
  Plus,
  Mail,
  Phone,
  MapPin,
  MoreVertical,
  Edit,
  Trash2
} from 'lucide-react';

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}>Clients</h2>
          <p style={{ color: '#64748b' }}>Manage your customer database and billing information.</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          Add New Client
        </button>
      </div>

      <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))' }}>
        {clients.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8', gridColumn: '1 / -1' }}>
            No clients added yet.
          </div>
        ) : (
          clients.map((client) => (
            <div key={client.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', background: '#eff6ff', color: '#2563eb', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 600, fontSize: '1.125rem' }}>{client.name}</h3>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>GST: {client.gstin || 'N/A'}</span>
                  </div>
                </div>
                <button style={{ color: '#64748b' }}><MoreVertical size={20} /></button>
              </div>
              
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#64748b', fontSize: '0.875rem' }}>
                  <Mail size={16} />
                  <span>{client.email || 'N/A'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#64748b', fontSize: '0.875rem' }}>
                  <Phone size={16} />
                  <span>{client.phone || 'N/A'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#64748b', fontSize: '0.875rem' }}>
                  <MapPin size={16} />
                  <span>{client.address || 'N/A'}</span>
                </div>
              </div>
  
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button className="btn btn-outline" style={{ flex: 1, fontSize: '0.875rem' }}>
                  <Edit size={16} />
                  Edit
                </button>
                <form action={async () => { "use server"; await deleteClient(client.id); }} style={{ flex: 1 }}>
                  <button type="submit" className="btn btn-outline" style={{ width: '100%', color: '#dc2626', borderColor: '#fee2e2', background: '#fef2f2', fontSize: '0.875rem' }}>
                    <Trash2 size={16} />
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
