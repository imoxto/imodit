import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import { relativeTimeFromDate } from "../../utils/date";
import { RegularPostFragment } from "../../utils/generates";
import { RowStack } from "../RowStack";

export function PostCard({ post }: { post: RegularPostFragment }) {
  return (
    <Stack borderColor="divider" m={2} px={2}>
      <Link href={`/p/${post.id}`}>
        <Typography variant="h6" sx={{ cursor: "pointer" }}>
          {post.title}
        </Typography>
      </Link>

      <Link href={`/p/${post.id}`}>
        <Typography variant="body2" sx={{ cursor: "pointer" }}>
          {post.content}
        </Typography>
      </Link>

      <RowStack justifyContent="space-between">
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
