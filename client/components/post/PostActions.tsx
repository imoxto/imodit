import { client, useUserStore } from "../../utils/config";
import {
  ExtendedPostFragment,
  useDeletePostMutation,
} from "../../utils/generates";
import { FormModal } from "../form/Modals";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { UpdatePostForm } from "./PostForm";
import { ConfirmDeleteButton } from "../form/ConfirmDeleteButton";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

export function UpdatePostAction({ post }: { post: ExtendedPostFragment }) {
  const userId = useUserStore((state) => state.user?.id);
  return userId === post.author?.id ? (
    <FormModal
      popupId={`edit-post-${post.id}`}
      button={
        <IconButton title="Edit Post">
          <EditIcon />
        </IconButton>
      }
    >
      {({ close }: any) => <UpdatePostForm post={post} afterUpdateCb={close} />}
    </FormModal>
  ) : null;
}

export function DeletePostAction({ post }: { post: ExtendedPostFragment }) {
  const userId = useUserStore((state) => state.user?.id);
  const { mutateAsync: deletePostAsync } = useDeletePostMutation(client);
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return userId === post.author?.id ? (
    <ConfirmDeleteButton
      confirmDeleteModalProps={{
        onConfirm() {
          deletePostAsync(
            { postId: post.id },
            {
              onSuccess(data) {
                if (data?.deletePost?.id === post.id) {
                  queryClient.invalidateQueries([
                    "FindAllPosts",
                    { postId: post.id },
                  ]);

                  enqueueSnackbar("Successfully created Post in!");
                } else if (data?.deletePost?.error) {
                  enqueueSnackbar(data.deletePost.error.message);
                }
              },
            }
          );
        },
      }}
      entity="post"
    />
  ) : null;
}
