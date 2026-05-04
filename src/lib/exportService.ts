import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

export const exportToExcel = (invoice: any, fileName: string) => {
  // 1. Invoice Summary Sheet
  const invoiceData = [
    ['TATA BILLING MODULE - INVOICE'],
    ['Invoice Number', invoice.invoiceNumber],
    ['PO Number', invoice.poNo || 'N/A'],
    ['Client', invoice.client.name],
    ['Date', new Date(invoice.date).toLocaleDateString()],
    [''],
    ['Sl No', 'Item Description', 'Part No', 'Qty', 'Rate', 'Total'],
    ...invoice.items.map((item: any, idx: number) => [
      idx + 1,
      item.product.name,
      item.product.partNo || 'N/A',
      item.quantity,
      item.price,
      item.total
    ]),
    [''],
    ['', '', '', '', 'Total Amount', invoice.totalAmount]
  ];

  // 2. Supporting Annexure Sheet (Fitment Details)
  const annexureData = [
    ['SUPPORTING ANNEXURE - FITMENT REPORT'],
    ['Invoice Reference', invoice.invoiceNumber],
    [''],
    ['Sl No', 'Device Model', 'Part No', 'City Tier', 'Fitment Date', 'Service Type', 'Rate'],
    ...invoice.items.filter((i: any) => i.serviceType === "INSTALLATION").map((item: any, idx: number) => [
      idx + 1,
      item.product.name.includes('LAF') ? 'LAF 4G' : 'CONCOX 4G',
      item.product.partNo || 'N/A',
      item.product.name.split('-').pop() || 'N/A',
      new Date(invoice.date).toLocaleDateString(),
      'Installation',
      item.price
    ])
  ];

  const wb = XLSX.utils.book_new();
  const wsInvoice = XLSX.utils.aoa_to_sheet(invoiceData);
  const wsAnnexure = XLSX.utils.aoa_to_sheet(annexureData);

  XLSX.utils.book_append_sheet(wb, wsInvoice, "Invoice");
  XLSX.utils.book_append_sheet(wb, wsAnnexure, "Supporting Annexure");

  XLSX.writeFile(wb, `${fileName}.xlsx`);
};

export const exportToPDF = (invoice: any, fileName: string) => {
  const doc = new jsPDF() as any;

  // Header
  doc.setFontSize(20);
  doc.setTextColor(0, 90, 156); // TATA Blue
  doc.text('TATA BILLING INVOICE', 14, 22);
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Invoice #: ${invoice.invoiceNumber}`, 14, 30);
  doc.text(`PO #: ${invoice.poNo || 'N/A'}`, 14, 35);
  doc.text(`Date: ${new Date(invoice.date).toLocaleDateString()}`, 14, 40);

  // Client Info
  doc.setTextColor(0);
  doc.setFontSize(12);
  doc.text('Bill To:', 14, 55);
  doc.setFontSize(10);
  doc.text(invoice.client.name, 14, 60);
  doc.text(invoice.client.address || 'N/A', 14, 65);
  doc.text(`GSTIN: ${invoice.client.gstin || 'N/A'}`, 14, 70);

  // Items Table
  doc.autoTable({
    startY: 80,
    head: [['Sl No', 'Item Description', 'Part No', 'Qty', 'Rate', 'Total']],
    body: invoice.items.map((item: any, idx: number) => [
      idx + 1,
      item.product.name,
      item.product.partNo || 'N/A',
      item.quantity,
      item.price.toLocaleString('en-IN'),
      item.total.toLocaleString('en-IN')
    ]),
    theme: 'grid',
    headStyles: { fillStyle: [0, 90, 156] },
  });

  const finalY = (doc as any).lastAutoTable.finalY;
  doc.setFontSize(12);
  doc.text(`Total Amount: INR ${invoice.totalAmount.toLocaleString('en-IN')}`, 140, finalY + 15);

  // Supporting Annexure (New Page)
  doc.addPage();
  doc.setFontSize(16);
  doc.setTextColor(0, 90, 156);
  doc.text('SUPPORTING ANNEXURE - FITMENT REPORT', 14, 22);
  
  doc.autoTable({
    startY: 35,
    head: [['Sl No', 'Device Details', 'Part No', 'Service', 'Rate']],
    body: invoice.items.map((item: any, idx: number) => [
      idx + 1,
      item.product.name,
      item.product.partNo || 'N/A',
      item.serviceType || 'Standard',
      item.price.toLocaleString('en-IN')
    ]),
    theme: 'striped',
  });

  doc.save(`${fileName}.pdf`);
};
