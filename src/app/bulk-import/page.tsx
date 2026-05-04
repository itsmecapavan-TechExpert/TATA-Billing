"use client";

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Upload, FileDown, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { importHardwareInvoices } from '@/lib/actions/bulkImportActions';

export default function BulkImportPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; count?: number; error?: string } | null>(null);

  const downloadTemplate = () => {
    const headers = [
      ['Date', 'HW Inv No', 'TATA PO Number', 'Vendor Name', 'Ultimate Customer Name', 'Stock Item Name', 'Device Model', 'Device No', 'VIN No', 'Installation City', 'Fitment Date'],
      ['04-05-2024', 'HW/24/001', '9700078288', 'Vendor A', 'Tata Motors', 'Concox VL149', 'Concox 4G', 'DEV123456', 'VIN789012', 'Mumbai', '05-05-2024']
    ];
    const ws = XLSX.utils.aoa_to_sheet(headers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.writeFile(wb, "Tally_Import_Template.xlsx");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setResult(null);

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);

        const res = await importHardwareInvoices(data as any[]);
        if (res.success) {
          setResult({ success: true, count: data.length });
        } else {
          setResult({ success: false, error: res.error });
        }
      } catch (err) {
        setResult({ success: false, error: "Failed to parse Excel file." });
      } finally {
        setLoading(false);
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Bulk Import Center</h2>
        <p style={{ color: '#64748b' }}>Upload your Hardware Invoice dump from Tally (Excel format).</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', background: '#f0f7ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#005a9c', marginBottom: '1.5rem' }}>
            <FileDown size={32} />
          </div>
          <h3 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Download Template</h3>
          <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '2rem' }}>
            Get the correctly formatted Excel template for importing your Tally data.
          </p>
          <button onClick={downloadTemplate} className="btn btn-outline" style={{ width: '100%' }}>
            Download Excel Template
          </button>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', background: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a', marginBottom: '1.5rem' }}>
            <Upload size={32} />
          </div>
          <h3 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Upload Excel</h3>
          <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '2rem' }}>
            Drop your Tally dump here to update Hardware Invoices and Device fitments.
          </p>
          <label className="btn btn-primary" style={{ width: '100%', cursor: 'pointer' }}>
            {loading ? <Loader2 className="animate-spin" size={18} /> : "Select File"}
            <input type="file" hidden accept=".xlsx, .xls" onChange={handleFileUpload} disabled={loading} />
          </label>
        </div>
      </div>

      {result && (
        <div className={`card animate-fade-in`} style={{ marginTop: '2rem', border: `1px solid ${result.success ? '#16a34a' : '#ef4444'}`, background: result.success ? '#f0fdf4' : '#fef2f2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {result.success ? <CheckCircle color="#16a34a" /> : <AlertCircle color="#ef4444" />}
            <div>
              <h4 style={{ fontWeight: 700, color: result.success ? '#166534' : '#991b1b' }}>
                {result.success ? "Import Successful" : "Import Failed"}
              </h4>
              <p style={{ fontSize: '0.875rem', color: result.success ? '#166534' : '#991b1b' }}>
                {result.success ? `Successfully processed ${result.count} line items.` : result.error}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
