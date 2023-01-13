import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import { ThemeProvider as PreferredThemeProvider, useTheme } from "next-themes";
import { FC, useMemo } from "react";
import { createEmotionCache } from "../utils/config";
import { createMuiTheme } from "../utils/theme";

export const MuiThemeProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { resolvedTheme } = useTheme();
  const currentTheme = useMemo(
    () => createMuiTheme(resolvedTheme),
    [resolvedTheme]
  );

  return (
    <ThemeProvider theme={currentTheme}>
      {/*<CssBaseline />*/}
      {children}
    </ThemeProvider>
  );
};

const clientSideEmotionCache = createEmotionCache();

interface PageProviderProps {
  emotionCache?: EmotionCache;
  children: React.ReactNode;
}

export const ImoditThemeProvider: FC<PageProviderProps> = ({
  children,
  emotionCache = clientSideEmotionCache,
}) => (
  <PreferredThemeProvider>
    <CacheProvider value={emotionCache}>
      <MuiThemeProvider>{children}</MuiThemeProvider>
    </CacheProvider>
  </PreferredThemeProvider>
);
