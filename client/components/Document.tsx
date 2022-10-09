import { Box } from "@mui/material";
import { ReactNode, useEffect } from "react";
import { client } from "../utils/config";
import { useMeQuery } from "../utils/generates";
import { useUserStore } from "../utils/stores";

export function Document({ children }: { children: ReactNode }) {
  const me = useMeQuery(client, {});
  const setUser = useUserStore((state) => state.setUser);
  useEffect(() => {
    setUser(me.data?.me?.user ?? null);
  }, [me.data?.me, setUser]);

  return <Box>{children}</Box>;
}
