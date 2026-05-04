"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getLocations() {
  return await prisma.location.findMany({
    orderBy: { name: 'asc' }
  });
}

export async function createLocation(formData: FormData) {
  const name = formData.get("name") as string;
  const address = formData.get("address") as string;

  try {
    await prisma.location.create({
      data: { name, address },
    });
    revalidatePath("/master/locations");
  } catch (error) {
    console.error("Failed to create location:", error);
  }
}

export async function deleteLocation(id: string) {
  try {
    await prisma.location.delete({ where: { id } });
    revalidatePath("/master/locations");
  } catch (error) {
    console.error("Failed to delete location:", error);
  }
}
