import React from "react";
import PostingSection from "./PostingSection";
import RecomendationSection from "./RecomendationSection";
import AppShell from "@/components/layout/AppShell";
import { getUser } from "@/utils/getUser";

const PostingView = async () => {
  const user = await getUser();
  return (
    <AppShell>
      <main className="w-full grid col-span-8 grid-cols-5 gap-4">
        <PostingSection user={user} />
        <RecomendationSection />
      </main>
    </AppShell>
  );
};

export default PostingView;
