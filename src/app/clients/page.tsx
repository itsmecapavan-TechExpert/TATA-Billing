import React from 'react';
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

export default function ClientsPage() {
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
        {[
          { name: 'Tata Motors Ltd.', email: 'billing@tatamotors.com', phone: '+91 22 6665 8282', address: 'Mumbai, Maharashtra', gst: '27AAAAA0000A1Z5' },
          { name: 'Tata Consultancy Services', email: 'accounts@tcs.com', phone: '+91 22 6778 9999', address: 'Mumbai, Maharashtra', gst: '27BBBBB1111B1Z6' },
          { name: 'Titan Company', email: 'finance@titan.co.in', phone: '+91 80 6660 9000', address: 'Bangalore, Karnataka', gst: '29CCCCC2222C1Z7' },
          { name: 'Tata Steel', email: 'billing@tatasteel.com', phone: '+91 657 243 1141', address: 'Jamshedpur, Jharkhand', gst: '20DDDDD3333D1Z8' },
        ].map((client, index) => (
          <div key={index} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', background: '#eff6ff', color: '#2563eb', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={24} />
                </div>
                <div>
                  <h3 style={{ fontWeight: 600, fontSize: '1.125rem' }}>{client.name}</h3>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>GST: {client.gst}</span>
                </div>
              </div>
              <button style={{ color: '#64748b' }}><MoreVertical size={20} /></button>
            </div>
            
            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#64748b', fontSize: '0.875rem' }}>
                <Mail size={16} />
                <span>{client.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#64748b', fontSize: '0.875rem' }}>
                <Phone size={16} />
                <span>{client.phone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#64748b', fontSize: '0.875rem' }}>
                <MapPin size={16} />
                <span>{client.address}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button className="btn btn-outline" style={{ flex: 1, fontSize: '0.875rem' }}>
                <Edit size={16} />
                Edit
              </button>
              <button className="btn btn-outline" style={{ color: '#dc2626', borderColor: '#fee2e2', background: '#fef2f2', fontSize: '0.875rem' }}>
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
