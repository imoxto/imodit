import { client, useUserStore } from "../../utils/config";
import {
  RegularCommentFragment,
  useDeleteCommentMutation,
} from "../../utils/generates";
import { FormModal } from "../form/Modals";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { UpdateCommentForm } from "./CommentForm";
import { ConfirmDeleteButton } from "../form/ConfirmDeleteButton";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

export function UpdateCommentAction({
  comment,
}: {
  comment: RegularCommentFragment;
}) {
  const userId = useUserStore((state) => state.user?.id);
  return userId === comment.author?.id ? (
    <FormModal
      popupId={`edit-comment-${comment.id}`}
      button={
        <IconButton title="Edit Comment">
          <EditIcon />
        </IconButton>
      }
    >
      {({ close }: any) => (
        <UpdateCommentForm comment={comment} afterUpdateCb={close} />
      )}
    </FormModal>
  ) : null;
}

export function DeleteCommentAction({
  comment,
}: {
  comment: RegularCommentFragment;
}) {
  const userId = useUserStore((state) => state.user?.id);
  const { mutateAsync: deleteCommentAsync } = useDeleteCommentMutation(client);
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  return userId === comment.author?.id ? (
    <ConfirmDeleteButton
      confirmDeleteModalProps={{
        onConfirm() {
          deleteCommentAsync(
            { commentId: comment.id },
            {
              onSuccess(data) {
                if (data?.deleteComment?.id === comment.id) {
                  queryClient.invalidateQueries([
                    "FindOnePost",
                    { postId: comment.post.id },
                  ]);
                  enqueueSnackbar("Successfully deleted Comment!");
                  if (router.pathname.includes(comment.id)) {
                    router.back();
                  }
                } else if (data?.deleteComment?.error) {
                  enqueueSnackbar(data.deleteComment.error.message);
                }
              },
            }
          );
        },
      }}
      entity="comment"
    />
  ) : null;
}
