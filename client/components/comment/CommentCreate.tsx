import { Stack, Button, IconButton } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { Formik, Form } from "formik";
import { useSnackbar } from "notistack";
import { client } from "../../utils/config";
import { CreateCommentInput, useCreateCommentMutation } from "../../utils/generates";
import { RowStack } from "../RowStack";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { TextInput } from "../form/TextInput";

export function CommentCreate({ postId }: { postId: string }) {
  const { mutateAsync } = useCreateCommentMutation(client);
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        content: "",
      }}
      onSubmit={async (values: Pick<CreateCommentInput, "content">, { setSubmitting, resetForm }) => {
        setSubmitting(true);

        await mutateAsync(
          {
            createCommentInput: { ...values, postId },
          },
          {
            onSuccess(data) {
              if (data?.createComment?.comment) {
                queryClient.invalidateQueries(["FindOnePost", { postId }]);

                enqueueSnackbar("Successfully created Comment in!");
              } else if (data?.createComment?.error) {
                enqueueSnackbar(data.createComment.error.message);
              }
            },
          }
        );
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Stack px={3} py={2}>
            <TextInput disabled={isSubmitting} placeholder="Comment Content" name="content" multiline={true} />
            <RowStack justifyContent="space-between" alignItems="center">
              <IconButton>
                <ThumbUpIcon />
              </IconButton>
              <Button variant="contained" color="primary" disabled={isSubmitting} onClick={submitForm}>
                Create Comment
              </Button>
            </RowStack>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
