import React from 'react';
import { 
  Settings as SettingsIcon, 
  Map, 
  Cpu, 
  DollarSign,
  Plus,
  Save
} from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}>Billing Configuration</h2>
          <p style={{ color: '#64748b' }}>Manage your tiered pricing for devices and cities.</p>
        </div>
        <button className="btn btn-primary">
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card">
            <h3 style={{ fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Cpu size={18} /> Device Models
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', background: '#f8fafc', borderRadius: '0.5rem' }}>
                <span>Concox 4G</span>
                <span className="badge badge-secondary">Active</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', background: '#f8fafc', borderRadius: '0.5rem' }}>
                <span>LAF 4G</span>
                <span className="badge badge-secondary">Active</span>
              </div>
              <button className="btn btn-outline" style={{ width: '100%', fontSize: '0.875rem' }}>
                <Plus size={16} /> Add Device
              </button>
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Map size={18} /> City Tiers
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Tier 1', 'Tier 2', 'Tier 3'].map(tier => (
                <div key={tier} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', background: '#f8fafc', borderRadius: '0.5rem' }}>
                  <span>{tier}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <DollarSign size={18} /> Installation Rates (Tier-based)
          </h3>
          <div className="table-container" style={{ border: 'none' }}>
            <table>
              <thead>
                <tr>
                  <th>Device</th>
                  <th>Tier 1 Rate</th>
                  <th>Tier 2 Rate</th>
                  <th>Tier 3 Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600 }}>Concox 4G</td>
                  <td><input type="number" defaultValue="500" style={{ width: '80px', padding: '0.25rem', border: '1px solid #e2e8f0', borderRadius: '0.25rem' }} /></td>
                  <td><input type="number" defaultValue="700" style={{ width: '80px', padding: '0.25rem', border: '1px solid #e2e8f0', borderRadius: '0.25rem' }} /></td>
                  <td><input type="number" defaultValue="900" style={{ width: '80px', padding: '0.25rem', border: '1px solid #e2e8f0', borderRadius: '0.25rem' }} /></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>LAF 4G</td>
                  <td><input type="number" defaultValue="600" style={{ width: '80px', padding: '0.25rem', border: '1px solid #e2e8f0', borderRadius: '0.25rem' }} /></td>
                  <td><input type="number" defaultValue="800" style={{ width: '80px', padding: '0.25rem', border: '1px solid #e2e8f0', borderRadius: '0.25rem' }} /></td>
                  <td><input type="number" defaultValue="1000" style={{ width: '80px', padding: '0.25rem', border: '1px solid #e2e8f0', borderRadius: '0.25rem' }} /></td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ fontWeight: 600, margin: '2rem 0 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             Standard Service Fees
          </h3>
          <div className="table-container" style={{ border: 'none' }}>
            <table>
              <thead>
                <tr>
                  <th>Service Type</th>
                  <th>Rate (₹)</th>
                  <th>Frequency</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'SIM Maintenance', rate: 150, freq: 'Monthly' },
                  { name: 'KYC Charges', rate: 250, freq: 'One-time' },
                  { name: 'SIM Activation', rate: 100, freq: 'One-time' },
                  { name: 'Shipment Charges', rate: 300, freq: 'Per Invoice' },
                  { name: 'Device Maintenance', rate: 500, freq: 'Yearly' },
                  { name: 'Extended Warranty (Y1)', rate: 1200, freq: 'One-time' },
                  { name: 'Extended Warranty (Y2)', rate: 1500, freq: 'One-time' },
                ].map((s, idx) => (
                  <tr key={idx}>
                    <td>{s.name}</td>
                    <td><input type="number" defaultValue={s.rate} style={{ width: '80px', padding: '0.25rem', border: '1px solid #e2e8f0', borderRadius: '0.25rem' }} /></td>
                    <td>{s.freq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
