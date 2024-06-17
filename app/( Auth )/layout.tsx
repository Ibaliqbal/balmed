"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  return (
    <main className="w-full flex items-center justify-center h-dvh text-white">
      <section className="lg:w-[30%]">
        <div className="p-10 flex justify-center items-center gap-4 flex-col shadow-lg shadow-black w-full">
          <h1 className="font-bold lg:text-3xl text-2xl">
            {pathname === "/login"
              ? "Welcome Back"
              : "Hello, welcome to BalMed"}
          </h1>
          {children}
          <p className="font-bold mt-3">
            Don`t hava an account ? Sign up{" "}
            <Link
              href={`/${pathname === "/login" ? "register" : "login"}`}
              className="text-blue-500"
            >
              here
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Layout;
