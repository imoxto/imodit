import { Button, Stack, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import { TextInput } from "../components/form";
import Link from "next/link";
import { useLoginMutation } from "../utils/generates";
import { useUserStore } from "../utils/config";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { client } from "../utils/config";
import { LoggedIn } from "../components/LoggedIn";

interface Values {
  username: string;
  password: string;
}

function Login() {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));
  const { mutateAsync } = useLoginMutation(client);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  if (user) {
    return <LoggedIn user={user} />;
  }
  return (
    <Stack alignItems="center" justifyContent="center">
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={async (values: Values, { setSubmitting }) => {
          setSubmitting(true);

          await mutateAsync(
            {
              loginInput: values,
            },
            {
              onSuccess(data) {
                if (data?.login?.user) {
                  queryClient.invalidateQueries(["Me", {}]);
                  enqueueSnackbar("Successfully logged in!");
                  setTimeout(() => {
                    if (router.pathname === "/login") {
                      router.push("/");
                    }
                  }, 3000);
                } else if (data?.login?.error) {
                  enqueueSnackbar(data.login.error.message);
                }
              },
            }
          );
          setSubmitting(false);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Typography variant="h2">Log In</Typography>
            <Stack gap={1}>
              <TextInput label="Username" disabled={isSubmitting} placeholder="Your username" name="username" />
              <TextInput label="Password" disabled={isSubmitting} placeholder="********" name="password" />
            </Stack>
            <Button variant="contained" color="primary" disabled={isSubmitting} onClick={submitForm}>
              Submit
            </Button>
            <Typography>
              {"Don't have an account? "}
              <Link href="/signup">
                <Button variant="text">SignUp</Button>
              </Link>
            </Typography>
          </Form>
        )}
      </Formik>
    </Stack>
  );
}

export default Login;
