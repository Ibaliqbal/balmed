"use server";

import { retriveData } from "@/lib/supabase/service";

export async function getAllUser() {
  const userDatas = await retriveData("users");
  return userDatas;
}
