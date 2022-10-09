import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import { RegularUserFragment } from "../utils/generates";

export function LoggedIn({ user }: { user: RegularUserFragment }) {
  return (
    <Stack alignItems="center" justifyContent="center" p={2} gap={3}>
      <Typography variant="h4">You are logged in!</Typography>
      <Link href="/">Go to Home</Link>
      <Link href="/posts">View Posts</Link>
      <Link href={`/u/${user.username}`}>View Your Profile</Link>
    </Stack>
  );
}
