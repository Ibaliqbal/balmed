import { UUID } from "crypto";
import { z } from "zod";

export type User = {
  id: string | UUID;
  name: string;
  email: string;
  password: string;
  following: any[];
  followers: any[];
  photo: string;
  createdAt: Date | string;
  username: string;
  posting_like: Array<string>;
  arsip_posting: Array<string>;
  about: string;
};

export const schemaRegister = z.object({
  name: z.string(),
  email: z.string().email({ message: "Email is not valid" }),
  password: z
    .string()
    .min(8, { message: "Minimum password must be at least 8 characters" })
    .max(16, { message: "Maximum password must be at least 16 characters" }),
});
