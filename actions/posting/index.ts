"use server";

import { getUser } from "@/utils/getUser";
import { supabase } from "@/lib/supabase/init";
import {
  getUrlFile,
  insertData,
  retriveSingleData,
  updateData,
} from "@/lib/supabase/service";
import { User } from "@/types/user.type";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { Hastags } from "@/types/hastags.type";
import { UUID } from "crypto";

export async function createPsoting(
  media: Array<{
    path: string;
    url: string;
  }>,
  hastags: Array<string>,
  formData: FormData
) {
  const data = await getServerSession();
  const user = (await getUser()) as User;
  const content = formData.get("content") as string;
  const mentions = formData.get("mentions") as string;
  const id = crypto.randomUUID();
  if (data) {
    const dataPost = {
      content,
      media,
      mentions,
      creator_id: user.id,
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
    if (result.error) {
      return false;
    } else {
      return true;
    }
  } else {
    console.log("please login first");
  }
}

export async function uploadMedia(data: { bucketName: string; file: File }) {
  try {
    console.log(data.bucketName);
    console.log(data.file);
    // const user = (await getUser()) as User;
    // const formatFile = file.type.split("/")[1];
    // if (user) {
    //   const res = await uploadFile(
    //     bucketName,
    //     file,
    //     `${user.id}/${file.name}.${formatFile}`
    //   );
    //   if (!res) return null;
    //   const url = await getUrlFile(res.data?.path as string);

    //   return url.publicUrl;
    // } else {
    //   return null;
    // }

    return "Berhasil";
  } catch (error) {
    console.log(error);
  }
}

export async function likePost(
  id: string | UUID,
  likes: number,
  unlike: boolean,
  user_id: string | UUID
) {
  const user = await getUser();
  if (user) {
    if (unlike) {
      const [result, posting] = await Promise.all([
        updateData(
          "users",
          {
            posting_like: user.posting_like.filter((posting) => posting !== id),
          },
          "id",
          user.id
        ),
        updateData("posting", { likes: likes - 1 }, "id", id),
      ]);

      if (result || posting) {
        revalidatePath("/");
        return true;
      } else {
        revalidatePath("/");
        return false;
      }
    } else {
      const [result, posting] = await Promise.all([
        updateData(
          "users",
          { posting_like: [...user.posting_like, id] },
          "id",
          user.id
        ),
        updateData("posting", { likes: likes + 1 }, "id", id),
      ]);

      if (result || posting) {
        revalidatePath("/");
        return true;
      } else {
        revalidatePath("/");
        return false;
      }
    }
  } else {
    return false;
  }
}
export async function bookmarkPost(
  id: string | UUID,
  mark: Array<string> | undefined,
  unmark: boolean
) {
  const user = await getUser();
  if (user) {
    if (mark)
      if (!unmark) {
        const result = await updateData(
          "users",
          { arsip_posting: [...mark, id] },
          "id",
          user.id
        );

        if (result) {
          return true;
        } else {
          return false;
        }
      } else {
        const result = await updateData(
          "users",
          { arsip_posting: mark?.filter((data) => data !== id) },
          "id",
          user.id
        );

        if (result) {
          return true;
        } else {
          return false;
        }
      }
  } else {
    return false;
  }
}

export async function getCreator(id: string) {
  const data = await retriveSingleData("users", "id", id);

  return data as User;
}

export async function getPosting() {
  const { data, error } = await supabase
    .from("posting")
    .select(
      `*, creator:users ( name, username, photo, about), comment:comments!id (count), like:likes_post!id (count), repost:repost_post!id (count)`
    );

  if (error) return null;

  return data;
}
