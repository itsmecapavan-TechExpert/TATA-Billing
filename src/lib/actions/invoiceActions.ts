"use strict";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getInvoices() {
  try {
    return await prisma.invoice.findMany({
      include: {
        client: true,
        items: true,
      },
      orderBy: { date: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch invoices:", error);
    return [];
  }
}

export async function createInvoice(data: any) {
  const { clientId, items, dueDate, status } = data;

  // Generate a simple invoice number
  const lastInvoice = await prisma.invoice.findFirst({
    orderBy: { createdAt: 'desc' }
  });
  const nextNum = lastInvoice ? parseInt(lastInvoice.invoiceNumber.split('-')[2]) + 1 : 1;
  const invoiceNumber = `INV-2024-${nextNum.toString().padStart(3, '0')}`;

  const totalAmount = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

  try {
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        clientId,
        dueDate: dueDate ? new Date(dueDate) : null,
        status: status || "DRAFT",
        totalAmount,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity,
          })),
        },
      },
    });
    revalidatePath("/invoices");
    revalidatePath("/");
    return invoice;
  } catch (error) {
    console.error("Failed to create invoice:", error);
    throw new Error("Failed to create invoice");
  }
}

export async function updateInvoiceStatus(id: string, status: string) {
  try {
    await prisma.invoice.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/invoices");
    revalidatePath("/");
  } catch (error) {
    console.error("Failed to update invoice status:", error);
    throw new Error("Failed to update invoice status");
  }
}
