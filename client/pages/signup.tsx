import { Button, Typography, Stack, Box } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { Formik, Form } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

import { TextInput } from "../components/form";
import { LoggedIn } from "../components/LoggedIn";
import { client } from "../utils/config";
import { useRegisterMutation } from "../utils/generates";
import { useUserStore } from "../utils/config";

interface Values {
  username: string;
  email: string;
  password: string;
}

function Signup() {
  const { user } = useUserStore((state) => ({ user: state.user }));
  const { mutateAsync } = useRegisterMutation(client);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  if (user) {
    return <LoggedIn user={user} />;
  }
  return (
    <Box alignItems="center">
      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          await mutateAsync(
            {
              registerInput: values,
            },
            {
              onSuccess(data) {
                if (data?.register?.user) {
                  queryClient.invalidateQueries(["Me", {}]);
                  enqueueSnackbar("Successfully signed up!");
                  setTimeout(() => {
                    if (router.pathname === "/login") {
                      router.push("/");
                    }
                  }, 3000);
                } else if (data?.register?.error) {
                  enqueueSnackbar(data.register.error.message);
                }
              },
            }
          );
          setSubmitting(false);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Typography alignItems="center" variant="h2">
              Sign Up
            </Typography>
            <Stack gap={1}>
              <TextInput label="Username" disabled={isSubmitting} placeholder="Your username" name="username" />
              <TextInput label="Email" disabled={isSubmitting} placeholder="example@email.com" name="email" />
              <TextInput label="Password" disabled={isSubmitting} placeholder="********" name="password" />
              <Button variant="contained" color="primary" disabled={isSubmitting} onClick={submitForm}>
                Submit
              </Button>
            </Stack>
            <Typography>
              {"Already have an account? "}
              <Link href="/login">
                <Button variant="text">Log In</Button>
              </Link>
            </Typography>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default Signup;
