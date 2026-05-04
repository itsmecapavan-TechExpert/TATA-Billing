# TATA Billing Module

A premium billing and invoice management system built with Next.js 15, Prisma 7, and Neon PostgreSQL.

## Getting Started

1.  **Clone the repository** (if not already done).
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Setup Environment Variables**:
    - Copy `.env.example` to `.env`.
    - Provide your Neon `DATABASE_URL`.
4.  **Database Setup**:
    ```bash
    npx prisma db push
    ```
5.  **Run Development Server**:
    ```bash
    npm run dev
    ```

## Features

- **Dashboard**: Overview of revenue, clients, and pending tasks.
- **Invoice Management**: Create, track, and manage customer invoices.
- **Client Management**: Maintain a database of clients and their billing details.
- **Product/Service Catalog**: Manage items for quick billing.
- **Premium UI**: Designed with TATA brand guidelines in mind, featuring a modern enterprise aesthetic.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Neon (PostgreSQL)
- **ORM**: Prisma 7
- **Styling**: Vanilla CSS / CSS Modules
- **Icons**: Lucide React
- **Animations**: Framer Motion
