import {
  createTheme,
  darken,
  lighten,
  PaletteMode,
  Theme as MaterialUITheme,
} from "@mui/material";

const myPrimaryColor = "#FF00FF";

declare module "@emotion/react" {
  // eslint-disable-next-line
  export interface Theme extends MaterialUITheme {}
}

function generateTheme(themeMode?: string) {
  const isLight = themeMode === "light";
  const primaryColor = isLight
    ? darken(myPrimaryColor, 0.05)
    : lighten(myPrimaryColor, 0.05);
  const background = {
    default: isLight ? "#110" : "#FFE",
  };
  return {
    themeMode: (isLight ? "light" : "dark") as PaletteMode,
    background,
    primaryColor,
  };
}

export function createMuiTheme(themeModeString?: string) {
  const { themeMode, background, primaryColor } =
    generateTheme(themeModeString);

  return createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: primaryColor,
      },
      background,
    },
  });
}
