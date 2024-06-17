"use client";
import React from "react";
import { signIn, signOut } from "next-auth/react";
import { IoLogInSharp, IoLogOut } from "react-icons/io5";
import { Session } from "next-auth";

type Props = {
  data: Session | null;
};

const ButtonLogout = ({ data }: Props) => {
  return data ? (
    <div className="flex justify-end">
      <button
        onClick={() => signOut()}
        className="text-white bg-red-600 py-4 px-3 flex items-center justify-center rounded-md"
      >
        <IoLogOut className="w-5 h-5" />
      </button>
    </div>
  ) : (
    <div className="flex justify-end">
      <button
        onClick={() => signIn()}
        className="text-white bg-blue-500 py-4 px-4 flex items-center justify-center rounded-md"
      >
        <IoLogInSharp className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ButtonLogout;
