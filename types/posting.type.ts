import { UUID } from "crypto";
import { User } from "./user.type";

export type Posting = {
  id: string | UUID;
  creator_id: string | UUID;
  content: string;
  media: Array<{
    path: string;
    url: string;
  }>;
  created_at: Date | string;
  mentions: string;
};

export type FetchPostings = Posting & {
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
