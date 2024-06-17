"use client";
import { retriveSingleData } from "@/lib/supabase/service";
import { User } from "@/types/user.type";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import * as React from "react";

type UserContextType = {
  user: User | undefined;
  userLoading: boolean;
};

const UserContext = React.createContext<UserContextType>({
  user: undefined,
  userLoading: false,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data } = useSession();
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await retriveSingleData(
        "users",
        "email",
        (data?.user.email as string) ?? " "
      );
      return user as User;
    },
    enabled: !!data,
  });
  return (
    <UserContext.Provider value={{ user, userLoading: isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const { user, userLoading } = React.useContext(UserContext);

  return { user, userLoading };
};
