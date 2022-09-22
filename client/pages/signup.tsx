import { Button, Typography, Stack, Box } from "@mui/material";
import { Formik, Form } from "formik";
import Link from "next/link";

import { TextInput } from "../components/form";

interface Values {
  username: string;
  email: string;
  password: string;
}

function Signup() {
  return (
    <Box alignItems="center">
      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
        }}
        validate={(values) => {
          const errors: Partial<Values> = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
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
