"use client";

import React from 'react';
import { Download, FileSpreadsheet, FileText } from 'lucide-react';
import { exportToPDF, exportToExcel } from '@/lib/exportService';

export default function ExportActions({ invoice }: { invoice: any }) {
  return (
    <div style={{ display: 'flex', gap: '0.75rem' }}>
      <button 
        onClick={() => exportToExcel(invoice, `Invoice_${invoice.invoiceNumber}`)}
        className="btn btn-outline"
        style={{ borderColor: '#16a34a', color: '#16a34a' }}
      >
        <FileSpreadsheet size={18} />
        Export Excel (+Annexure)
      </button>
      <button 
        onClick={() => exportToPDF(invoice, `Invoice_${invoice.invoiceNumber}`)}
        className="btn btn-outline"
        style={{ borderColor: '#dc2626', color: '#dc2626' }}
      >
        <FileText size={18} />
        Export PDF (+Annexure)
      </button>
    </div>
  );
}
