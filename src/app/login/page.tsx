"use client";

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false
      });

      if (res?.error) {
        setError("Invalid email or password. Or account pending approval.");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout-wrapper" style={{ justifyContent: 'center', alignItems: 'center', background: '#f8fafc' }}>
      <div className="card" style={{ width: '100%', maxWidth: '450px', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ color: '#005a9c', fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>TATA Billing</div>
          <h2 style={{ fontWeight: 700, fontSize: '1.25rem' }}>Welcome Back</h2>
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Log in to your account</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input name="email" type="email" required placeholder="itsmecapavan@gmail.com" style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input name="password" type="password" placeholder="Leave blank if first time" style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }} />
            </div>
          </div>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', fontSize: '0.875rem', background: '#fef2f2', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.875rem' }} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : "Log In"}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: '#64748b' }}>
          Don't have an account? <a href="/signup" style={{ color: '#005a9c', fontWeight: 600 }}>Sign Up</a>
        </div>
      </div>
    </div>
  );
}
