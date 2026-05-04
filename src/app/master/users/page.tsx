import React from 'react';
import prisma from '@/lib/prisma';
import { approveUser } from '@/lib/actions/userActions';
import { Shield, UserCheck, Clock, ShieldAlert } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function UserManagementPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>User Management</h2>
        <p style={{ color: '#64748b' }}>Approve new signups and manage access roles.</p>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Requested Role</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td style={{ fontWeight: 600 }}>{user.name || 'Anonymous'}</td>
                <td>{user.email}</td>
                <td>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {user.role === 'ADMIN' ? <Shield size={16} color="#005a9c" /> : <UserCheck size={16} color="#64748b" />}
                      {user.role}
                   </div>
                </td>
                <td>
                  <span className={`badge ${user.isApproved ? 'badge-success' : 'badge-warning'}`}>
                    {user.isApproved ? 'Approved' : 'Pending Approval'}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  {!user.isApproved && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <form action={async (formData) => { "use server"; await approveUser(user.id, 'USER'); }}>
                        <button className="btn btn-outline" style={{ fontSize: '0.75rem', color: '#16a34a', borderColor: '#16a34a' }}>Approve as User</button>
                      </form>
                      <form action={async (formData) => { "use server"; await approveUser(user.id, 'VIEWER'); }}>
                        <button className="btn btn-outline" style={{ fontSize: '0.75rem' }}>Approve as Viewer</button>
                      </form>
                    </div>
                  )}
                  {user.isApproved && user.role !== 'ADMIN' && (
                    <button className="btn btn-outline" style={{ fontSize: '0.75rem', color: '#ef4444' }}>Revoke Access</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
