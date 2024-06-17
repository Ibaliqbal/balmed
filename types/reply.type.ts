import { UUID } from "crypto";
import { User } from "./user.type";

export type Reply = {
  id: string | UUID;
  posting_id: string | UUID;
  media: Array<{
    path: string;
    url: string;
  }>;
  creator_id: string | UUID;
  created_at: string | Date;
  mentions: string;
};

export type ActionTypeReply = {
  id: string | UUID;
  reply_id: string | UUID;
  user_id: string | UUID;
  created_at: string | Date;
};

export type FetchReply = Reply & {
  creator: Pick<User, "name" | "username" | "photo" | "about">;
  comment: Array<{
    count: number;
  }>;
  like: Array<{
    count: number;
  }>;
  repost: Array<{
    count: number;
  }>;
};
