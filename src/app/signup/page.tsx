"use client";

import React, { useState } from 'react';
import { signupUser } from '@/lib/actions/userActions';
import { User, Mail, Lock, Loader2, CheckCircle } from 'lucide-react';

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const res = await signupUser(formData);

    if (res.success) {
      setSuccess(true);
    } else {
      setError(res.error || "Signup failed.");
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="layout-wrapper" style={{ justifyContent: 'center', alignItems: 'center', background: '#f8fafc' }}>
        <div className="card" style={{ maxWidth: '400px', textAlign: 'center', padding: '3rem' }}>
          <div style={{ color: '#16a34a', marginBottom: '1.5rem' }}><CheckCircle size={64} style={{ margin: '0 auto' }} /></div>
          <h2 style={{ fontWeight: 800, marginBottom: '1rem' }}>Request Sent!</h2>
          <p style={{ color: '#64748b', marginBottom: '2rem' }}>
            Your account has been created and sent to the Administrator for approval.
          </p>
          <a href="/login" className="btn btn-primary" style={{ width: '100%' }}>Back to Login</a>
        </div>
      </div>
    );
  }

  return (
    <div className="layout-wrapper" style={{ justifyContent: 'center', alignItems: 'center', background: '#f8fafc' }}>
      <div className="card" style={{ width: '100%', maxWidth: '450px', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ color: '#005a9c', fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>TATA Billing</div>
          <h2 style={{ fontWeight: 700, fontSize: '1.25rem' }}>Create Account</h2>
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Join the GPS Billing Module</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input name="name" required placeholder="John Doe" style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input name="email" type="email" required placeholder="name@company.com" style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input name="password" type="password" required placeholder="••••••••" style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }} />
            </div>
          </div>

          {error && <div style={{ color: '#ef4444', fontSize: '0.875rem', textAlign: 'center' }}>{error}</div>}

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.875rem' }} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : "Sign Up"}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: '#64748b' }}>
          Already have an account? <a href="/login" style={{ color: '#005a9c', fontWeight: 600 }}>Log In</a>
        </div>
      </div>
    </div>
  );
}
