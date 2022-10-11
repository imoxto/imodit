import { Box, Button, IconButton } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

interface IconButtonProps {
  icon: ReactNode;
  label: string;
  href: string;
  newTab?: boolean;
}

export function ResponsiveIconButton(props: IconButtonProps) {
  const { icon, label, href, newTab } = props;

  return (
    <>
      <Box
        sx={{
          display: {
            xs: "initial",
            md: "none",
          },
        }}
      >
        {newTab ? (
          <IconButton
            color="primary"
            sx={{ padding: 1, minWidth: "fit-content" }}
            href={href}
            target={"_blank"}
            rel="noopener"
          >
            {icon}
          </IconButton>
        ) : (
          <Link href={href}>
            <IconButton sx={{ padding: 1, minWidth: "fit-content" }}>{icon}</IconButton>
          </Link>
        )}
      </Box>
      <Box
        sx={{
          display: {
            md: "initial",
            xs: "none",
          },
        }}
      >
        {newTab ? (
          <Button variant="outlined" href={href} target="_blank" rel="noopener" startIcon={icon}>
            {label}
          </Button>
        ) : (
          <Link href={href}>
            <Button variant="outlined" startIcon={icon}>
              {label}
            </Button>
          </Link>
        )}
      </Box>
    </>
  );
}
