import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { RegularUserFragment } from "../utils/generates";

export function UserDetailsPage({ user }: { user: RegularUserFragment }) {
  return (
    <Stack>
      <Typography>{user.username}</Typography>
      <Typography>{user.email}</Typography>
      <Typography>{user.visibility}</Typography>
    </Stack>
  );
}
