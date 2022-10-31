import { Stack } from "@mui/material";
import React from "react";
import { RegularPostFragment } from "../utils/generates";
import { PostCard } from "./PostCard";

export function PostList({ posts }: { posts: RegularPostFragment[] }) {
  return (
    <Stack px={3}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Stack>
  );
}
