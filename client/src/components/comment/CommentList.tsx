import { Stack } from "@mui/material";
import { ExtendedPostFragment } from "../../utils/generates";
import { CommentCard } from "./CommentCard";
import { CreateCommentForm } from "./CommentForm";

export function CommentList({
  comments,
  postId,
}: {
  postId: string;
  comments: ExtendedPostFragment["comments"];
}) {
  return (
    <Stack px={3}>
      <CreateCommentForm postId={postId} />
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={{ ...comment, post: { id: postId } }}
        />
      ))}
    </Stack>
  );
}
