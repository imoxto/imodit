import { Stack, StackProps } from "@mui/material";
import { ReactNode } from "react";

export function RowStack({ children, ...props }: { children: ReactNode } & StackProps) {
  return (
    <Stack flexDirection="row" gap={1} alignItems="center" {...props}>
      {children}
    </Stack>
  );
}
