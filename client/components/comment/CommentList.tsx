import { Stack } from "@mui/material";
import React from "react";
import { ExtendedPostFragment } from "../../utils/generates";
import { CommentCard } from "./CommentCard";
import { CommentCreate } from "./CommentCreate";

export function CommentList({ comments, postId }: { postId: string; comments: ExtendedPostFragment["comments"] }) {
  return (
    <Stack px={3}>
      <CommentCreate postId={postId} />
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </Stack>
  );
}
