import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { relativeTimeFromDate } from "../utils/date";
import { RegularPostFragment } from "../utils/generates";
import { RowStack } from "./RowStack";

export function PostCard({ post }: { post: RegularPostFragment }) {
  return (
    <Stack>
      <Typography variant="h6">{post.title}</Typography>
      <Typography>{post.content}</Typography>

      <RowStack>
        <Typography variant="caption">{relativeTimeFromDate(post.createdAt)}</Typography>
        <RowStack>
          <Link href={`/u/${post.author.id}`}>
            <Typography variant="overline" sx={{ cursor: "pointer" }}>
              by {post.author.username}
            </Typography>
          </Link>
        </RowStack>
      </RowStack>
    </Stack>
  );
}
