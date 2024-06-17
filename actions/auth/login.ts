"use server";

import { retriveSingleData } from "@/lib/supabase/service";

export async function login() {
  const user = await retriveSingleData("users", "email", "bal@gmail.com");

  return user;
}
