"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import "primereact/resources/primereact.css";
import { twMerge } from "tailwind-merge";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const Providers = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <SessionProvider>
      <PrimeReactProvider
        value={{
          unstyled: true,
          pt: Tailwind,
          ptOptions: {
            mergeSections: true,
            mergeProps: true,
            classNameMergeFunction: twMerge,
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </PrimeReactProvider>
    </SessionProvider>
  );
};

export default Providers;
