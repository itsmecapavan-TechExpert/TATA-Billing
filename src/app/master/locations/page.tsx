import React from 'react';
import { getLocations, createLocation, deleteLocation } from '@/lib/actions/locationActions';
import { MapPin, Plus, Trash2 } from 'lucide-react';

export default async function LocationsPage() {
  const locations = await getLocations();

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Master Data: Locations</h2>
          <p style={{ color: '#64748b' }}>Manage your stock shipping locations.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        <div className="card">
          <h3 style={{ fontWeight: 600, marginBottom: '1.5rem' }}>Add New Location</h3>
          <form action={createLocation}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Location Name</label>
                <input name="name" required placeholder="e.g. Mumbai Warehouse" className="form-control" style={{ width: '100%', padding: '0.625rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Address</label>
                <textarea name="address" placeholder="Full address..." className="form-control" style={{ width: '100%', padding: '0.625rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', minHeight: '100px' }} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <Plus size={18} /> Add Location
              </button>
            </div>
          </form>
        </div>

        <div className="card">
          <h3 style={{ fontWeight: 600, marginBottom: '1.5rem' }}>Existing Locations</h3>
          <div className="table-container" style={{ border: 'none' }}>
            <table>
              <thead>
                <tr>
                  <th>Location Name</th>
                  <th>Address</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {locations.length === 0 ? (
                  <tr><td colSpan={3} style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem' }}>No locations added yet.</td></tr>
                ) : (
                  locations.map(loc => (
                    <tr key={loc.id}>
                      <td style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <MapPin size={16} color="#005a9c" /> {loc.name}
                      </td>
                      <td style={{ fontSize: '0.875rem' }}>{loc.address || '-'}</td>
                      <td style={{ textAlign: 'right' }}>
                        <form action={async () => { "use server"; await deleteLocation(loc.id); }}>
                          <button type="submit" style={{ color: '#ef4444' }}><Trash2 size={18} /></button>
                        </form>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
