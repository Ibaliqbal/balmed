"use client";
import { registerUser } from "@/actions/auth/register";
import { schemaRegister } from "@/types/user.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const RegisterPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<z.infer<typeof schemaRegister>>({
    resolver: zodResolver(schemaRegister),
  });

  async function onSubmit(data: z.infer<typeof schemaRegister>) {
    const response = await registerUser.bind(null, data)();

    if (response) {
      router.push("/login");
    } else {
      alert("gagal");
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 w-full mt-4"
    >
      <div className="flex gap-3 flex-col">
        <label htmlFor="name" className="font-semibold text-lg">
          Fullname
        </label>
        <input
          className="text-black p-5 rounded-md"
          type="text"
          {...register("name")}
          id="name"
          placeholder="Fullname"
        />
      </div>
      <div className="flex gap-3 flex-col">
        <label htmlFor="email" className="font-semibold text-lg">
          Email
        </label>
        <input
          className="text-black p-5 rounded-md"
          type="email"
          {...register("email")}
          id="email"
          placeholder="email"
        />
      </div>
      <div className="flex gap-3 flex-col">
        <label htmlFor="password" className="font-semibold text-lg">
          Password
        </label>
        <input
          className="text-black p-5 rounded-md"
          type="password"
          id="password"
          {...register("password")}
          placeholder="masukkan password anda"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-sky-500 px-4 py-5 rounded-md disabled:cursor-not-allowed disabled:bg-opacity-60"
      >
        {isSubmitting ? "Loading..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterPage;
