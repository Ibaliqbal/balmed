"use server";

import { insertData } from "@/lib/supabase/service";
import bcrypt from "bcrypt";

export async function registerUser(data: {
  email: string;
  password: string;
  name: string;
}) {
  const user = {
    ...data,
    password: await bcrypt.hash(data.password, 12),
    photo: "",
    following: [],
    followers: [],
    arsip_posting: [],
    posting_like: [],
    username: data.name,
  };

  const res = await insertData("users", user);

  if (res.error) {
    return false;
  }
  return true;
}
