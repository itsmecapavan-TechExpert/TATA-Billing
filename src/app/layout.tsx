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

        <style jsx global>{`
          .layout-wrapper {
            display: flex;
            min-height: 100vh;
          }

          .sidebar {
            width: 260px;
            background: #ffffff;
            border-right: 1px solid #e2e8f0;
            display: flex;
            flex-direction: column;
            padding: 1.5rem;
            position: fixed;
            height: 100vh;
          }

          .logo-section {
            margin-bottom: 2rem;
          }

          .logo-text {
            color: #005a9c;
            font-size: 1.25rem;
            font-weight: 700;
          }

          .nav-menu {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .nav-item {
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            color: #64748b;
            font-weight: 500;
            transition: all 0.2s;
          }

          .nav-item:hover {
            background: #f1f5f9;
            color: #005a9c;
          }

          .nav-item.active {
            background: #f0f7ff;
            color: #005a9c;
          }

          .main-content {
            flex: 1;
            margin-left: 260px;
            display: flex;
            flex-direction: column;
          }

          .top-header {
            height: 64px;
            background: #ffffff;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 2rem;
            position: sticky;
            top: 0;
            z-index: 10;
          }

          .search-bar input {
            padding: 0.5rem 1rem;
            border: 1px solid #e2e8f0;
            border-radius: 0.5rem;
            width: 300px;
            font-family: inherit;
          }

          .user-profile {
            display: flex;
            align-items: center;
            gap: 1rem;
          }

          .user-avatar {
            width: 32px;
            height: 32px;
            background: #005a9c;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.875rem;
            font-weight: 600;
          }

          .content-area {
            padding: 2rem;
            flex: 1;
          }

          @media (max-width: 768px) {
            .sidebar {
              display: none;
            }
            .main-content {
              margin-left: 0;
            }
          }
        `}</style>
      </body>
    </html>
  );
}
