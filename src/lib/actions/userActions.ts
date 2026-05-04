"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function signupUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'VIEWER', // Default role
        isApproved: false // Pending approval
      }
    });
    return { success: true };
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { error: "Email already exists." };
    }
    return { error: "Failed to create account." };
  }
}

export async function approveUser(id: string, role: string) {
  try {
    await prisma.user.update({
      where: { id },
      data: { isApproved: true, role: role as any }
    });
    revalidatePath("/master/users");
  } catch (error) {
    console.error("Approval error:", error);
  }
}

export async function updateUserPassword(email: string, newPassword: string) {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword }
    });
    return { success: true };
  } catch (error) {
    return { error: "Failed to update password." };
  }
}
