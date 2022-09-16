import { Button, Typography } from "@mui/material";
import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Typography>Welcome to Imodit!</Typography>
      <Typography>
        <Link href="/login">
          <Button variant="text">Login</Button>
        </Link>{" "}
        or{" "}
        <Link href="/signup">
          <Button variant="text">SignUp</Button>
        </Link>{" "}
        to get started
      </Typography>
    </>
  );
};

export default Home;
