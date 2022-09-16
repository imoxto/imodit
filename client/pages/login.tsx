import { Button, LinearProgress, Link, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";

interface Values {
  username: string;
  password: string;
}

function Login() {
  return (
    <>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        // validate={}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            alert(JSON.stringify(values, null, 2));
          }, 500);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
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
        {"Don't have an account? "}
        <Link href="/signup">
          <Button variant="text">SignUp</Button>
        </Link>
      </Typography>
    </>
  );
}

export default Login;
