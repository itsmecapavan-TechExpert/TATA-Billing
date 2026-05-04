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
              <a href="/invoices" className="nav-item">Invoices</a>
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
                <span className="user-name">Admin User</span>
                <div className="user-avatar">JD</div>
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
