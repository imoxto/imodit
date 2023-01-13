import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useUserStore } from "../../utils/config";
import { relativeTimeFromDate } from "../../utils/date";
import { RegularCommentFragment } from "../../utils/generates";
import { RowStack } from "../RowStack";
import { DeleteCommentAction, UpdateCommentAction } from "./CommentActions";

export function CommentCard({ comment }: { comment: RegularCommentFragment }) {
  const userId = useUserStore((state) => state.user?.id);
  return (
    <Stack borderColor="divider" m={2} px={2}>
      <RowStack justifyContent="space-between">
        <Link href={`/u/${comment.author.id}`}>
          <Typography variant="overline" sx={{ cursor: "pointer" }}>
            {comment.author.username}
          </Typography>
        </Link>
        <Typography variant="caption">
          {relativeTimeFromDate(comment.createdAt)}
        </Typography>
      </RowStack>
      <Typography variant="body2">{comment.content}</Typography>
      <RowStack gap={2} justifyContent="flex-end">
        <UpdateCommentAction comment={comment} />
        <DeleteCommentAction comment={comment} />
      </RowStack>
    </Stack>
  );
}
