"use client";
import { signIn } from "next-auth/react";
import React from "react";

const Profile = () => {
  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <div className="loader"></div>
    </div>
  );
};

export default Profile;
