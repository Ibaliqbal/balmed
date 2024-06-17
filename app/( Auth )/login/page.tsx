"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const LoginPage = ({ searchParams }: any) => {
  const { push } = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const callbackUrl = searchParams.callbackUrl || "/";
  const handleLogin = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    setError("");

    setIsLoading(true);

    const form = evt.target as HTMLFormElement;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });
      if (!res?.error) {
        push(callbackUrl);
      } else {
        if (res.status === 401) {
          setError("Invalid email or password");
          setIsLoading(false);
        }
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {error && (
        <p className="text-red-500 text-center font-semibold">{error}</p>
      )}
      <form onSubmit={handleLogin} className="flex flex-col gap-6 w-full mt-4">
        <div className="flex gap-3 flex-col">
          <label htmlFor="email" className="font-semibold text-lg">
            Email
          </label>
          <input
            className="text-black p-5 rounded-md"
            type="email"
            id="email"
            name="email"
            placeholder="johndoe@example.com"
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
            name="password"
            placeholder="masukkan password anda"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-sky-500 px-4 py-5 rounded-md"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginPage;
