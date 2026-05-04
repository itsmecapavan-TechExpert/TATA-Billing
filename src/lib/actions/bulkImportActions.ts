"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function importHardwareInvoices(data: any[]) {
  // data is an array of objects from Excel
  // Format: Date (DD-MM-YYYY), HW Inv No, TATA PO Number, Vendor Name, Ultimate Customer Name, Stock Item Name, Device Model, Device No, VIN No, Installation City, Fitment Date
  
  try {
    for (const row of data) {
      const hwInvNo = row['HW Inv No'] || row['hw_inv_no'];
      const dateParts = (row['Date'] || row['date']).toString().split('-');
      const invoiceDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`); // YYYY-MM-DD
      
      const fitmentDateStr = row['Fitment Date'] || row['fitment_date'];
      let fitmentDate = null;
      if (fitmentDateStr) {
        const fParts = fitmentDateStr.toString().split('-');
        fitmentDate = new Date(`${fParts[2]}-${fParts[1]}-${fParts[0]}`);
      }

      // 1. Create or get HardwareInvoice
      const hwInvoice = await prisma.hardwareInvoice.upsert({
        where: { hwInvoiceNo: hwInvNo.toString() },
        update: {
          tataPoNo: row['TATA PO Number']?.toString(),
          vendorName: row['Vendor Name']?.toString(),
          ultimateCustomerName: row['Ultimate Customer Name']?.toString(),
          stockItemName: row['Stock Item Name']?.toString(),
          deviceModel: row['Device Model']?.toString(),
        },
        create: {
          hwInvoiceNo: hwInvNo.toString(),
          date: invoiceDate,
          tataPoNo: row['TATA PO Number']?.toString(),
          vendorName: row['Vendor Name']?.toString(),
          ultimateCustomerName: row['Ultimate Customer Name']?.toString(),
          stockItemName: row['Stock Item Name']?.toString(),
          deviceModel: row['Device Model']?.toString(),
        }
      });

      // 2. Create Device Fitment
      await prisma.device.upsert({
        where: { deviceNo: row['Device No']?.toString() || row['device_no']?.toString() },
        update: {
          vinNo: row['VIN No']?.toString() || row['vin_no']?.toString(),
          installationCity: row['Installation City']?.toString() || row['installation_city']?.toString(),
          fitmentDate: fitmentDate,
          hardwareInvoiceId: hwInvoice.id
        },
        create: {
          deviceNo: row['Device No']?.toString() || row['device_no']?.toString(),
          vinNo: row['VIN No']?.toString() || row['vin_no']?.toString(),
          installationCity: row['Installation City']?.toString() || row['installation_city']?.toString(),
          fitmentDate: fitmentDate,
          hardwareInvoiceId: hwInvoice.id
        }
      });
    }
    
    revalidatePath("/invoices/hardware");
    return { success: true };
  } catch (error) {
    console.error("Bulk Import Error:", error);
    return { success: false, error: String(error) };
  }
}
