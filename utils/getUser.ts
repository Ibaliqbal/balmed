import { getServerSession } from "next-auth";
import { retriveSingleData } from "../lib/supabase/service";
import { User } from "@/types/user.type";

export async function getUser() {
  const user = await getServerSession();

  if (user) {
    const data = await retriveSingleData("users", "email", user.user.email);
    return data as User;
  } else {
    return null;
  }
}
