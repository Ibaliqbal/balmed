"use client";
import React, { useState } from "react";
import GalleryMedia from "../client/posting/GalleryMedia";
import PostAction from "../client/posting/PostAction";
import Avatar from "../ui/avatar";
import TitleUser from "../client/TitleUser";
import { User } from "@/types/user.type";
import { FetchPostings } from "@/types/posting.type";
import { format, formatDistanceStrict } from "date-fns";
import Link from "next/link";

type Props = {
  data: FetchPostings;
  user: User | null;
};

const Post = ({ data, user }: Props) => {
  return (
    <article>
      <section className="w-full flex gap-4 pt-3">
        <Avatar user={data.creator} />
        <article className="w-full pt-1 pl-3 border-l-4 border-l-slate-700">
          <TitleUser
            user={data.creator}
            date={
              formatDistanceStrict(new Date(data.created_at), new Date(), {
                // includeSeconds: true,
                addSuffix: true,
              }) === "1 month ago"
                ? format(new Date(data.created_at), "MMMM, dd")
                : formatDistanceStrict(new Date(data.created_at), new Date(), {
                    // includeSeconds: true,
                    addSuffix: true,
                  })
            }
          />
          <div className="mt-3 flex flex-col gap-3 text-lg has-[:disabled]:cursor-not-allowed">
            <p className="whitespace-normal text-justify indent-4">
              {data.content}
            </p>
            {data.mentions ? (
              <p>
                {data.mentions.split(" ").map((mention, i) =>
                  mention.startsWith("@") || mention.startsWith("#") ? (
                    <Link
                      href={"/"}
                      key={`mention_${i}`}
                      className="text-blue-600"
                    >
                      {mention}{" "}
                    </Link>
                  ) : (
                    `${mention} `
                  )
                )}
              </p>
            ) : null}
          </div>
          {data.media?.length > 0 ? (
            <GalleryMedia gallery={data.media} />
          ) : null}
          <PostAction
            creator={data.creator}
            data={{
              content: data.content,
              media: data.media,
              mentions: data.mentions,
              created_at: data.created_at,
              creator_id: data.creator_id,
              id: data.id,
            }}
            totalCommentS={data.comment[0].count}
            user={user}
          />
        </article>
      </section>
    </article>
  );
};

export default Post;
