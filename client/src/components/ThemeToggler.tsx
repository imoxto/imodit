import Brightness5Outlined from "@mui/icons-material/Brightness5Outlined";
import ModeNightOutlined from "@mui/icons-material/ModeNightOutlined";
import { IconButton } from "@mui/material";
import { useTheme } from "next-themes";

export function ThemeToggler() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <IconButton
      size="small"
      disableRipple
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
    >
      {resolvedTheme === "light" ? (
        <Brightness5Outlined fontSize="small" />
      ) : (
        <ModeNightOutlined fontSize="small" />
      )}
    </IconButton>
  );
}
