import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { MyLink } from "./MyLink";
import { useUserStore } from "../utils/config";
import { RowStack } from "./RowStack";
import { useLogoutMutation } from "../utils/generates";
import { client } from "../utils/config";
import { useQueryClient } from "@tanstack/react-query";

export function NavBar() {
  const { user } = useUserStore(({ user }) => ({ user }));
  const { mutateAsync } = useLogoutMutation(client, {});
  const queryClient = useQueryClient();
  return (
    <RowStack position="static" px={1} sx={{ flexGrow: 1 }}>
      <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>
      <MyLink href="/">
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Imodit
        </Typography>
      </MyLink>
      {!user ? (
        <>
          <MyLink href="/login">
            <Button variant="outlined">Login</Button>
          </MyLink>
          <MyLink href="/signup">
            <Button variant="outlined">Signup</Button>
          </MyLink>
        </>
      ) : (
        <>
          <MyLink href={`/u/${user.username}`}>
            <Button variant="contained">{user.username}</Button>
          </MyLink>
          <Button
            variant="outlined"
            onClick={async () => {
              await mutateAsync(
                {},
                {
                  onSuccess() {
                    queryClient.invalidateQueries(["Me", {}]);
                  },
                }
              );
            }}
          >
            Logout
          </Button>
        </>
      )}
    </RowStack>
  );
}
