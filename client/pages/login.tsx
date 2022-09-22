import { Box, Button, Stack, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import { TextInput } from "../components/form";
import Link from "next/link";

interface Values {
  username: string;
  password: string;
}

function Login() {
  return (
    <Box alignItems="center">
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        // validate={}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);

          setTimeout(() => {
            setSubmitting(false);
            alert(JSON.stringify(values, null, 2));
          }, 500);
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
    </Box>
  );
}

export default Login;
