import Brightness5Outlined from "@mui/icons-material/Brightness5Outlined";
import ModeNightOutlined from "@mui/icons-material/ModeNightOutlined";
import { IconButton } from "@mui/material";
import { useThemeMode } from "./ThemeMode";

export function ThemeToggler() {
  const { setThemeMode, themeMode } = useThemeMode();

  return (
    <IconButton
      size="small"
      disableRipple
      onClick={() => setThemeMode(themeMode === "dark" ? "light" : "dark")}
    >
      {themeMode === "dark" ? (
        <ModeNightOutlined fontSize="small" />
      ) : (
        <Brightness5Outlined fontSize="small" />
      )}
    </IconButton>
  );
}
