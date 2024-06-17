"use server";

import { retriveData } from "@/lib/supabase/service";

export async function getHastags() {
  const hastags = await retriveData("hastags");

  return hastags;
}
