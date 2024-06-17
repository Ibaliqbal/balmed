"use server";

import {
  insertData,
  retriveDataByColumn,
  retriveSingleData,
  updateData,
} from "@/lib/supabase/service";
import { CommentPost } from "@/types/comment.type";
import { Hastags } from "@/types/hastags.type";
import { User } from "@/types/user.type";
import { getUser } from "@/utils/getUser";
import { revalidatePath } from "next/cache";

export async function createComment(
  media: Array<{
    path: string;
    url: string;
  }>,
  hastags: Array<string>,
  formData: FormData
) {
  const user = (await getUser()) as User;
  const content = formData.get("content") as string;
  const mentions = formData.get("mentions") as string;
  const id = crypto.randomUUID();
  if (user) {
    const dataPost = {
      content,
      media,
      mentions,
      updated_at: new Date(),
      created_at: new Date(),
      likes: 0,
      user_id: user.id,
      id,
    };
    const checkHastags = hastags.map(async (hastag) => {
      const data: Hastags | null = await retriveSingleData(
        "hastags",
        "name",
        hastag
      );

      if (data) {
        await updateData(
          "hastags",
          { sum_posts: [...data.sum_posts, id] },
          "id",
          data.id
        );
      } else {
        const dataHastags = { name: hastag, sum_posts: [id] };
        await insertData("hastags", dataHastags);
      }
    });
    const [_, result] = await Promise.all([
      checkHastags,
      insertData("posting", dataPost),
    ]);
    revalidatePath("/");
    if (result.error) {
      return false;
    } else {
      return true;
    }
  } else {
    console.log("please login first");
  }
}

export async function getCommentPosting(id: string) {
  const data = await retriveDataByColumn("comments", "posting_id", id);

  return data as CommentPost[];
}
