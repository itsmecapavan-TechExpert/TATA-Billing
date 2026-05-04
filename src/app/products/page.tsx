import React from 'react';
import { 
  Package, 
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Tag
} from 'lucide-react';

export default function ProductsPage() {
  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}>Products & Services</h2>
          <p style={{ color: '#64748b' }}>Manage your catalog of items and services for billing.</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          Add New Item
        </button>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ position: 'relative' }}>
          <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={18} />
          <input 
            type="text" 
            placeholder="Search by product name, HSN or category..." 
            style={{ 
              width: '100%', 
              padding: '0.75rem 1rem 0.75rem 3rem', 
              border: '1px solid #e2e8f0', 
              borderRadius: '0.5rem',
              fontFamily: 'inherit'
            }} 
          />
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Category</th>
              <th>HSN/SAC</th>
              <th>Price</th>
              <th>Stock</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Consultation Fee', category: 'Service', hsn: '998311', price: '₹5,000.00', stock: 'N/A' },
              { name: 'Software Development', category: 'Service', hsn: '998314', price: '₹1,50,000.00', stock: 'N/A' },
              { name: 'Cloud Server Maintenance', category: 'Service', hsn: '998713', price: '₹12,000.00', stock: 'N/A' },
              { name: 'Data Security Audit', category: 'Service', hsn: '998316', price: '₹45,000.00', stock: 'N/A' },
              { name: 'Hardware Infrastructure', category: 'Product', hsn: '8471', price: '₹85,000.00', stock: '12' },
            ].map((item, index) => (
              <tr key={index}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '32px', height: '32px', background: '#f8fafc', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                      {item.category === 'Service' ? <Tag size={16} /> : <Package size={16} />}
                    </div>
                    <span style={{ fontWeight: 600 }}>{item.name}</span>
                  </div>
                </td>
                <td><span className="badge badge-secondary">{item.category}</span></td>
                <td>{item.hsn}</td>
                <td style={{ fontWeight: 600 }}>{item.price}</td>
                <td>{item.stock}</td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <button style={{ color: '#64748b' }} title="Edit"><Edit size={18} /></button>
                    <button style={{ color: '#dc2626' }} title="Delete"><Trash2 size={18} /></button>
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
