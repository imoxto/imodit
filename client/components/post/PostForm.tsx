import { Stack, Button } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { Formik, Form } from "formik";
import { useSnackbar } from "notistack";
import { client } from "../../utils/config";
import {
  CreatePostInput,
  RegularPostFragment,
  UpdatePostInput,
  useCreatePostMutation,
  useUpdatePostMutation,
} from "../../utils/generates";
import { RowStack } from "../RowStack";
import { SelectInput } from "../form/SelectInput";
import { TextInput } from "../form/TextInput";

export function CreatePostForm() {
  const { mutateAsync } = useCreatePostMutation(client);
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <PostForm
      initialValues={{
        content: "",
        title: "",
        visibility: "public" as any,
      }}
      onSubmit={async (
        values: CreatePostInput,
        { setSubmitting, resetForm }
      ) => {
        setSubmitting(true);

        await mutateAsync(
          {
            createPostInput: values,
          },
          {
            onSuccess(data) {
              if (data?.createPost?.post) {
                queryClient.invalidateQueries(["FindAllPosts"]);

                enqueueSnackbar("Successfully created Post in!");
              } else if (data?.createPost?.error) {
                enqueueSnackbar(data.createPost.error.message);
              }
            },
          }
        );
        setSubmitting(false);
        resetForm();
      }}
      buttonText="Create Post"
    />
  );
}

export function UpdatePostForm({
  post,
  afterUpdateCb,
}: {
  post: RegularPostFragment;
  afterUpdateCb: () => void;
}) {
  const { mutateAsync } = useUpdatePostMutation(client);
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <PostForm
      initialValues={{
        content: post.content,
        title: post.title,
        visibility: post.visibility as any,
      }}
      onSubmit={async (
        values: UpdatePostInput,
        { setSubmitting, resetForm }
      ) => {
        setSubmitting(true);

        await mutateAsync(
          {
            updatePostInput: values,
            postId: post.id,
          },
          {
            onSuccess(data) {
              if (data?.updatePost?.post) {
                queryClient.invalidateQueries([
                  "FindAllPosts",
                  { postId: post.id },
                ]);

                enqueueSnackbar("Successfully created Post in!");
              } else if (data?.updatePost?.error) {
                enqueueSnackbar(data.updatePost.error.message);
              }
            },
          }
        );
        setSubmitting(false);
        resetForm();
        afterUpdateCb();
      }}
      buttonText="Create Post"
    />
  );
}

export function PostForm({
  initialValues,
  onSubmit,
  buttonText,
}: {
  initialValues: CreatePostInput;
  onSubmit: (
    values: CreatePostInput,
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
              placeholder="title of post"
              name="title"
            />
            <TextInput
              disabled={isSubmitting}
              placeholder="Post Content"
              name="content"
              multiline={true}
            />
            <RowStack justifyContent="space-between" alignItems="center">
              <SelectInput
                disabled={isSubmitting}
                placeholder="Post Content"
                name="visibility"
                values={["public", "private"]}
              />
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