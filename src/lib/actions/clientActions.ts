"use strict";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getClients() {
  try {
    return await prisma.client.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch clients:", error);
    return [];
  }
}

export async function createClient(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;
  const gstin = formData.get("gstin") as string;

  try {
    await prisma.client.create({
      data: { name, email, phone, address, gstin },
    });
    revalidatePath("/clients");
  } catch (error) {
    console.error("Failed to create client:", error);
    throw new Error("Failed to create client");
  }
}

export async function deleteClient(id: string) {
  try {
    await prisma.client.delete({
      where: { id },
    });
    revalidatePath("/clients");
  } catch (error) {
    console.error("Failed to delete client:", error);
    throw new Error("Failed to delete client");
  }
}
