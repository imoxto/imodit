import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import { relativeTimeFromDate } from "../../utils/date";
import { ExtendedPostFragment } from "../../utils/generates";
import { CommentList } from "../comment/CommentList";
import { RowStack } from "../RowStack";
import { DeletePostAction, UpdatePostAction } from "./PostActions";

export function PostDetails({ post }: { post: ExtendedPostFragment }) {
  return (
    <Stack gap={2} m={2} px={2}>
      <Link href={`/p/${post.id}`}>
        <Typography variant="h6" sx={{ cursor: "pointer" }}>
          {post.title}
        </Typography>
      </Link>

      <Typography variant="body1">{post.content}</Typography>

      <RowStack justifyContent="space-between">
        <Typography variant="caption">
          {relativeTimeFromDate(post.createdAt)}
        </Typography>
        <RowStack>
          <UpdatePostAction post={post} />
          <DeletePostAction post={post} />
        </RowStack>
        <RowStack>
          <Link href={`/u/${post.author.id}`}>
            <Typography variant="overline" sx={{ cursor: "pointer" }}>
              by {post.author.username}
            </Typography>
          </Link>
        </RowStack>
      </RowStack>

      <CommentList postId={post.id} comments={post.comments} />
    </Stack>
  );
}
