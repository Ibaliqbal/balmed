import { UUID } from "crypto";

export type Hastags = {
  id: string | UUID;
  name: string;
  created_at: Date | string;
  sum_posts: Array<string | UUID>;
};
