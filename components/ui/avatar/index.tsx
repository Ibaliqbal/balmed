"use client";
import TooltipUser from "@/components/client/TooltipUser";
import Image from "next/image";
import React from "react";
import { AnimatePresence } from "framer-motion";
import { User } from "@/types/user.type";

type Props = {
  user: Pick<User, "name" | "username" | "about" | "photo">;
};

const Avatar = ({ user }: Props) => {
  const [openModal, setOpenModal] = React.useState(false);
  return (
    <picture className="relative">
      <Image
        src={user?.photo ? user.photo : "/profile.jpg"}
        alt="Profile"
        width={60}
        height={60}
        className="cursor-pointer rounded-full"
        onMouseEnter={() => setOpenModal(true)}
        onMouseLeave={() => setOpenModal(false)}
      />
      <AnimatePresence>
        {openModal && (
          <TooltipUser
            className="-left-[150px] top-[70px] w-[350px] hidden lg:block z-10"
            onMouseEnter={() => setOpenModal(true)}
            onMouseLeave={() => setOpenModal(false)}
          >
            <article className="w-full h-full p-5 flex flex-col gap-6">
              <div className="flex justify-between">
                <Image
                  src={user?.photo ? user.photo : "/profile.jpg"}
                  alt="Profile"
                  width={70}
                  height={70}
                  className="cursor-pointer rounded-full"
                />
                <button className="bg-white text-black self-start px-6 py-3 rounded-full font-bold">
                  Follow
                </button>
              </div>
              <div className="w-full flex flex-col ">
                <h3>{user?.name}</h3>
                <p className="text-gray-400">@{user?.username}</p>
              </div>
              <p>{user?.about}</p>
              <div className="flex justify-evenly">
                <p>
                  60 <span className="text-gray-400">Following</span>
                </p>
                <p>
                  500 <span className="text-gray-400">Followers</span>
                </p>
              </div>
            </article>
          </TooltipUser>
        )}
      </AnimatePresence>
    </picture>
  );
};

export default Avatar;
