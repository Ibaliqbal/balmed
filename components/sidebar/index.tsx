import React from "react";
import ButtonLogout from "../ButtonLogout";
import Link from "next/link";
import {
  IoHome,
  IoMailOutline,
  IoNotifications,
  IoSearchOutline,
} from "react-icons/io5";
import { FaUser, FaUserFriends, FaRegBookmark } from "react-icons/fa";
import { getServerSession } from "next-auth";

const Sidebar = async () => {
  const data = await getServerSession();
  return (
    <aside className="w-full p-4 flex flex-col gap-8 h-dvh sticky top-0">
      {data ? (
        <nav className="flex-col grow h-full w-full items-end flex text-3xl justify-between text-white">
          <h1 className="text-xl font-bold">BM</h1>
          <Link href={"/"}>
            <IoHome />
          </Link>
          <Link href={"/"}>
            <IoSearchOutline />
          </Link>
          <Link href={"/"}>
            <IoNotifications />
          </Link>
          <Link href={"/"}>
            <IoMailOutline />
          </Link>
          <Link href={"/"}>
            <FaRegBookmark />
          </Link>
          <Link href={"/"}>
            <FaUser />
          </Link>
          <Link href={"/"}>
            <FaUserFriends />
          </Link>
        </nav>
      ) : (
        <nav className="flex-col grow h-full w-full items-end flex text-3xl gap-10 text-white">
          <h1 className="text-xl font-bold">BM</h1>
          <Link href={"/"}>
            <IoHome />
          </Link>
          <Link href={"/"}>
            <IoSearchOutline />
          </Link>
        </nav>
      )}
      <ButtonLogout data={data} />
    </aside>
  );
};

export default Sidebar;
