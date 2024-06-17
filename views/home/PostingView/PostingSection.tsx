"use client";
import Navbar from "@/components/navbar";
import Link from "next/link";
import React from "react";
import PostingForm from "@/components/client/posting/PostingForm";
import Post from "@/components/server/Post";
import { FetchPostings, Posting } from "@/types/posting.type";
import { User } from "@/types/user.type";
import PostingSekeleton from "@/components/Sekeleton/PostingSekeleton";
import { useQuery } from "@tanstack/react-query";
import { getPosting } from "@/actions/posting";

type Props = {
  user: User | null;
};

const PostingSection = ({ user }: Props) => {
  const { isLoading, data } = useQuery({
    queryKey: ["postings"],
    queryFn: async () => await getPosting(),
  });

  if (isLoading) return <PostingSekeleton />;
  console.log(data);
  return (
    <section className="w-full col-span-3 border-x-2 border-x-slate-700 pb-10">
      <Navbar>
        <nav className="grid grid-cols-2 w-full navbar-home  text-white border-b-4 border-b-slate-700">
          <div className="w-full text-center py-7 font-semibold">
            <Link href={"/"} className="border-b-4 pb-2 border-b-blue-600">
              For You
            </Link>
          </div>
          <div className="w-full text-center py-7 font-semibold">
            <Link href={"/"}>Following</Link>
          </div>
        </nav>
      </Navbar>
      <div className="p-4 text-white mt-4 divide-y-4 divide-slate-700 flex flex-col gap-5">
        {user ? (
          <PostingForm withTitle user={user} />
        ) : (
          <div className="py-4 w-full flex items-center justify-center text-xl">
            Please login first to posting anything do you want!
          </div>
        )}
        <section className="pt-4 flex flex-col gap-5 divide-y-4 divide-slate-700">
          {data?.map((post, i) => (
            <Post key={i} data={post as FetchPostings} user={user} />
          ))}
        </section>
      </div>
    </section>
  );
};

export default PostingSection;
