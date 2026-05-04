"use strict";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getProducts() {
  try {
    return await prisma.product.findMany({
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const hsn = formData.get("hsn") as string;

  try {
    await prisma.product.create({
      data: { name, description, price, hsn },
    });
    revalidatePath("/products");
  } catch (error) {
    console.error("Failed to create product:", error);
    throw new Error("Failed to create product");
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    });
    revalidatePath("/products");
  } catch (error) {
    console.error("Failed to delete product:", error);
    throw new Error("Failed to delete product");
  }
}
