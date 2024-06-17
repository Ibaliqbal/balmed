"use client";
import React, { useState } from "react";
import {
  FaRegComment,
  FaShare,
  FaRegBookmark,
  FaRegHeart,
} from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { BiRepost } from "react-icons/bi";
import { Tooltip } from "primereact/tooltip";
import { Posting } from "@/types/posting.type";
import { bookmarkPost, likePost } from "@/actions/posting";
import { User } from "@/types/user.type";
import toast from "react-hot-toast";
import Modal from "@/components/ui/modal";
import { motion } from "framer-motion";
import PostingForm from "./PostingForm";
import Image from "next/image";
import TitleUser from "../TitleUser";
import { format, formatDistanceStrict } from "date-fns";
import Link from "next/link";

type Props = {
  data: Posting;
  totalCommentS?: number;
  user: User | null;
  creator?: Pick<User, "name" | "username" | "about" | "photo">;
};

const PostAction = ({ data, totalCommentS, user, creator }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="w-full mt-2 pt-4 flex items-center justify-between">
      <Tooltip
        target=".comment"
        mouseTrack
        mouseTrackTop={10}
        position="bottom"
      />
      <button
        className="flex items-center gap-2 comment disabled:cursor-not-allowed"
        data-pr-tooltip="Comments"
        onClick={() => setOpenModal(true)}
        disabled={isLoading}
      >
        <FaRegComment className="w-6 h-6" /> {totalCommentS}
      </button>
      <Tooltip
        target=".repost"
        mouseTrack
        mouseTrackTop={10}
        position="bottom"
      />
      <button
        disabled={isLoading}
        className="flex items-center gap-2 repost disabled:cursor-not-allowed"
        data-pr-tooltip="Repost"
      >
        <BiRepost className="w-8 h-8" /> 40
      </button>
      <Tooltip target=".like" mouseTrack mouseTrackTop={10} position="bottom" />
      <button
        disabled={isLoading}
        className={`flex items-center gap-2 disabled:cursor-not-allowed like hover:text-red-600 `}
        data-pr-tooltip="Like"
        // onClick={async () => {
        //   try {
        //     setIsLoading(true);
        //     if (user?.posting_like.find((post) => post === data.id)) {
        //       const res = await likePost(data.id, data.likes, true, user?.id);
        //       if (!res) return toast.success("Unlike tis post failed");
        //       toast.success("Unlike this post successfully");
        //     } else {
        //       const res = await likePost(data.id, data.likes, false, user?.id);
        //       if (!res) return toast.success("Like this post failed");
        //       toast.success("Like this post successfully");
        //     }
        //   } catch (error) {
        //     console.log(error);
        //   } finally {
        //     setIsLoading(false);
        //   }
        // }}
      >
        <FaRegHeart className="w-6 h-6" /> 40
      </button>
      <div className="flex items-center gap-5">
        <Tooltip
          target=".bookmark"
          mouseTrack
          mouseTrackTop={10}
          position="bottom"
        />
        <button
          // disabled={bookmarkPending}
          className="disabled:cursor-not-allowed"
          // onClick={async () => {
          //   try {
          //     setIsLoading(true);
          //     if (user?.arsip_posting.find((posting) => posting === data.id)) {
          //       await bookmarkMutate(true);
          //     } else {
          //       await bookmarkMutate(false);
          //     }
          //   } catch (error) {
          //     console.log(error);
          //   }
          // }}
        >
          <FaRegBookmark
            className={`w-6 h-6  bookmark hover:text-yellow-500`}
            data-pr-tooltip="Bookmark"
          />
        </button>
        <Tooltip
          target=".share"
          mouseTrack
          mouseTrackTop={10}
          position="bottom"
        />
        <FaShare
          className="w-6 h-6 cursor-pointer share hover:text-blue-700"
          data-pr-tooltip="Share"
          // onClick={async () => {
          //   await navigator.clipboard.writeText(
          //     `${process.env.NEXT_PUBLIC_APP_URL}/post/${data.id}`
          //   );
          //   toast.success("Copied to clipboard");
          // }}
        />
      </div>
      <Modal open={openModal} setOpen={setOpenModal}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{
            scale: 1,
            transition: {
              duration: 0.3,
            },
          }}
          exit={{
            scale: 0,
          }}
          className="fixed bg-primary h-fit max-w-[750px] overflow-auto max-h-[700px] m-auto mt-12 inset-0 gap-4 z-30 p-6 rounded-xl"
        >
          <span
            className="absolute right-6 text-2xl cursor-pointer"
            onClick={() => setOpenModal(false)}
          >
            <IoCloseSharp />
          </span>
          <div className="w-full flex gap-4 pt-5">
            <picture className="flex flex-col items-center gap-2">
              <Image
                src={creator?.photo ? creator.photo : "/profile.jpg"}
                alt="Profile"
                width={60}
                height={60}
                className="rounded-full"
              />
              <div className="w-1 grow bg-gray-700 rounded-full" />
            </picture>
            <article className="w-full pt-1 pl-3 border-l-4 border-l-slate-700">
              <TitleUser
                user={creator}
                date={
                  formatDistanceStrict(new Date(data.created_at), new Date(), {
                    // includeSeconds: true,
                    addSuffix: true,
                  }) === "1 month ago"
                    ? format(new Date(data.created_at), "MMMM, dd")
                    : formatDistanceStrict(
                        new Date(data.created_at),
                        new Date(),
                        {
                          // includeSeconds: true,
                          addSuffix: true,
                        }
                      )
                }
              />
              <p className="leading-normal line-clamp-4 mt-3">{data.content}</p>
              <p>
                Replying to :{" "}
                <Link href={"/"} className="text-blue-600">
                  @{creator?.username}
                </Link>{" "}
                {data.mentions &&
                  data.mentions
                    .split(" ")
                    .filter((mention) => mention.startsWith("@"))
                    .map((mention, i) => (
                      <Link className="text-blue-600" href={"/"} key={`m_${i}`}>
                        {mention}{" "}
                      </Link>
                    ))}{" "}
              </p>
            </article>
          </div>
          <PostingForm withTitle={false} user={user} />
        </motion.div>
      </Modal>
    </div>
  );
};

export default PostAction;
