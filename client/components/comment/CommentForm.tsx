import { Stack, Button, IconButton } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { Formik, Form } from "formik";
import { useSnackbar } from "notistack";
import { client } from "../../utils/config";
import {
  CreateCommentInput,
  RegularCommentFragment,
  UpdateCommentInput,
  useCreateCommentMutation,
  useUpdateCommentMutation,
} from "../../utils/generates";
import { RowStack } from "../RowStack";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { TextInput } from "../form/TextInput";

export function CreateCommentForm({ postId }: { postId: string }) {
  const { mutateAsync } = useCreateCommentMutation(client);
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <CommentForm
      initialValues={{
        content: "",
      }}
      onSubmit={async (
        values: Pick<CreateCommentInput, "content">,
        { setSubmitting, resetForm }
      ) => {
        setSubmitting(true);

        await mutateAsync(
          {
            createCommentInput: { ...values, postId },
          },
          {
            onSuccess(data) {
              if (data?.createComment?.comment) {
                queryClient.invalidateQueries(["FindOnePost", { postId }]);

                enqueueSnackbar("Successfully created a Comment!");
              } else if (data?.createComment?.error) {
                enqueueSnackbar(data.createComment.error.message);
              }
            },
          }
        );
        setSubmitting(false);
        resetForm();
      }}
      buttonText="Create Comment"
    />
  );
}

export function UpdateCommentForm({
  comment,
  afterUpdateCb,
}: {
  comment: RegularCommentFragment;
  afterUpdateCb?: () => void;
}) {
  const { mutateAsync } = useUpdateCommentMutation(client);
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <CommentForm
      initialValues={{
        content: comment.content,
      }}
      onSubmit={async (
        values: Pick<UpdateCommentInput, "content">,
        { setSubmitting, resetForm }
      ) => {
        setSubmitting(true);

        await mutateAsync(
          {
            commentId: comment.id,
            updateCommentInput: { ...values },
          },
          {
            onSuccess(data) {
              if (data?.updateComment?.comment) {
                queryClient.invalidateQueries([
                  "FindOnePost",
                  { postId: data?.updateComment?.comment.post.id },
                ]);

                enqueueSnackbar("Successfully updated the Comment!");
              } else if (data?.updateComment?.error) {
                enqueueSnackbar(data.updateComment.error.message);
              }
            },
          }
        );
        setSubmitting(false);
        resetForm();
        afterUpdateCb?.();
      }}
      buttonText="Update Comment"
    />
  );
}

export function CommentForm({
  initialValues,
  onSubmit,
  buttonText,
}: {
  initialValues: Pick<CreateCommentInput, "content">;
  onSubmit: (
    values: Pick<CreateCommentInput, "content">,
    {
      setSubmitting,
      resetForm,
    }: {
      setSubmitting: any;
      resetForm: any;
    }
  ) => Promise<void>;
  buttonText: string;
}) {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Stack px={3} py={2}>
            <TextInput
              disabled={isSubmitting}
              placeholder="Comment Content"
              name="content"
              multiline={true}
            />
            <RowStack justifyContent="space-between" alignItems="center">
              <IconButton>
                <ThumbUpIcon />
              </IconButton>
              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                {buttonText}
              </Button>
            </RowStack>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
