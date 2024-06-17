import { UUID } from "crypto";
import { User } from "./user.type";

export type CommentPost = {
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

export type FetchComment = CommentPost & {
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
