import { Button, LinearProgress, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import Link from "next/link";

interface Values {
  username: string;
  email: string;
  password: string;
}

function Signup() {
  return (
    <>
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
          setTimeout(() => {
            setSubmitting(false);
            alert(JSON.stringify(values, null, 2));
          }, 500);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Field component={TextField} name="email" type="email" label="Email" />
            <Field component={TextField} name="username" type="username" label="Username" />
            <br />
            <Field component={TextField} name="password" type="password" label="Password" />
            {isSubmitting && <LinearProgress />}
            <br />
            <Button variant="contained" color="primary" disabled={isSubmitting} onClick={submitForm}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      <Typography>
        {"Already have an account? "}
        <Link href="/login">
          <Button variant="text">Log In</Button>
        </Link>
      </Typography>
    </>
  );
}

export default Signup;
