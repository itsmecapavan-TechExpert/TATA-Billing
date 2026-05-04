import React from 'react';
import { getProducts, createProduct, deleteProduct } from '@/lib/actions/productActions';
import { 
  Package, 
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Tag
} from 'lucide-react';

export default async function ProductsPage() {
  const products = await getProducts();

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
            placeholder="Search by product name, HSN or part number..." 
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
              <th>Part No</th>
              <th>HSN/SAC</th>
              <th>Base Price</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>No products added yet.</td></tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '32px', height: '32px', background: '#f8fafc', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                        <Tag size={16} />
                      </div>
                      <span style={{ fontWeight: 600 }}>{product.name}</span>
                    </div>
                  </td>
                  <td><span className="badge badge-secondary">{product.partNo || '-'}</span></td>
                  <td>{product.hsn || '-'}</td>
                  <td style={{ fontWeight: 600 }}>₹{product.basePrice.toLocaleString('en-IN')}</td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <button style={{ color: '#64748b' }} title="Edit"><Edit size={18} /></button>
                      <form action={async () => { "use server"; await deleteProduct(product.id); }}>
                        <button type="submit" style={{ color: '#dc2626' }} title="Delete"><Trash2 size={18} /></button>
                      </form>
                    </div>
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
