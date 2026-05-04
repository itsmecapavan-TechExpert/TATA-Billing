import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TATA Billing Module",
  description: "Advanced billing and invoice management system for TATA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="layout-wrapper">
          <aside className="sidebar">
            <div className="logo-section">
              <img src="/logo.png" alt="TATA Billing" style={{ height: '40px', width: 'auto' }} />
            </div>
            <nav className="nav-menu">
              <a href="/" className="nav-item active">Dashboard</a>
              <div style={{ padding: '0.5rem 1rem 0.25rem', fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em' }}>BILLING</div>
              <a href="/invoices" className="nav-item">Service Invoices</a>
              <a href="/invoices/hardware" className="nav-item">Hardware Invoices</a>
              <div style={{ padding: '0.5rem 1rem 0.25rem', fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em' }}>MASTERS</div>
              <a href="/clients" className="nav-item">Clients</a>
              <a href="/products" className="nav-item">Products</a>
              <a href="/settings" className="nav-item">Settings</a>
            </nav>
          </aside>
          <main className="main-content">
            <header className="top-header">
              <div className="search-bar">
                <input type="text" placeholder="Search invoices, clients..." />
              </div>
              <div className="user-profile">
              <div className="control-center">
                <button className="btn btn-outline" style={{ border: '1px solid #e2e8f0', background: 'white' }}>
                  Control Center
                </button>
                <div className="dropdown-menu">
                  <div className="dropdown-header">MASTER DATA</div>
                  <a href="/master/locations" className="dropdown-item">Locations</a>
                  <a href="/master/devices" className="dropdown-item">Device Types</a>
                  <div className="dropdown-header">OPERATIONS</div>
                  <a href="/bulk-import" className="dropdown-item">Bulk Import (Excel)</a>
                </div>
              </div>
              <div className="user-avatar">JD</div>
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Admin User</span>
            </div>
            </header>
            <div className="content-area">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
