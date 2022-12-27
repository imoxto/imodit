import { PaletteMode } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  ReactNode,
  useMemo,
} from "react";
import { useLocalStorage } from "./hooks";
import { createMuiTheme } from "../utils/theme";

export interface IThemeModeContext {
  themeMode: PaletteMode;
  setThemeMode: Dispatch<SetStateAction<PaletteMode>>;
}

export const ThemeModeContext = createContext<IThemeModeContext>({
  themeMode: "light",
  setThemeMode: () => null,
});

export function useThemeMode() {
  return useContext(ThemeModeContext);
}

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const prefersDark =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : true;

  const defaultMode = prefersDark ? "dark" : "light";

  const [themeMode, setThemeMode] = useLocalStorage<PaletteMode>(
    "theme.mode",
    defaultMode
  );

  const context = useMemo(
    () => ({
      themeMode,
      setThemeMode,
    }),
    [themeMode, setThemeMode]
  );

  const theme = useMemo(() => createMuiTheme(themeMode), [themeMode]);

  return (
    <ThemeModeContext.Provider value={context}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
