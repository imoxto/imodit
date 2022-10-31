import { Stack, Button } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { Formik, Form } from "formik";
import { useSnackbar } from "notistack";
import { client } from "../../utils/config";
import { CreatePostInput, useCreatePostMutation } from "../../utils/generates";
import { RowStack } from "../RowStack";
import { SelectInput } from "./SelectInput";
import { TextInput } from "./TextInput";

export function PostForm() {
  const { mutateAsync } = useCreatePostMutation(client);
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        content: "",
        title: "",
        visibility: "public" as any,
      }}
      onSubmit={async (values: CreatePostInput, { setSubmitting, resetForm }) => {
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
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Stack gap={1} p={3}>
            <TextInput disabled={isSubmitting} placeholder="title of post" name="title" />
            <TextInput disabled={isSubmitting} placeholder="Post Content" name="content" multiline={true} />
            <RowStack justifyContent="space-between" alignItems="center">
              <SelectInput
                disabled={isSubmitting}
                placeholder="Post Content"
                name="visibility"
                values={["public", "private"]}
              />
              <Button variant="contained" color="primary" disabled={isSubmitting} onClick={submitForm}>
                Create Post
              </Button>
            </RowStack>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
