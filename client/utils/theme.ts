import { Theme } from "@emotion/react";
import {
  alpha,
  createTheme,
  darken,
  lighten,
  PaletteMode,
  Theme as MaterialUITheme,
} from "@mui/material";
import { green, grey, red, yellow } from "@mui/material/colors";

const myPrimaryColor = "#6F7BE7";

declare module "@emotion/react" {
  // eslint-disable-next-line
  export interface Theme extends MaterialUITheme {}
}

declare module "@mui/material/styles/createPalette" {
  interface TypeBackground {
    light: string;
    dark: string;
    darker: string;
  }

  interface Palette {
    scrollbar: {
      track: string;
      thumb: string;
    };
    yellow: Palette["primary"];
    green: Palette["primary"];
    red: Palette["primary"];
  }

  interface PaletteOptions {
    scrollbar: {
      track: string;
      thumb: string;
    };
    yellow: Palette["primary"];
    green: Palette["primary"];
    red: Palette["primary"];
  }
}

const spacing = (factor: number) => {
  return `${0.25 * factor}rem`;
};

const disableRipple = {
  disableFocusRipple: true,
  disableTouchRipple: true,
  disableRipple: true,
};

export function scrollbarBackground(theme: Theme) {
  return theme.palette.mode === "dark"
    ? lighten(theme.palette.background.default, 0.1)
    : lighten(theme.palette.background.default, 0.175);
}

function generateTheme(themeMode: PaletteMode) {
  const contrastText = themeMode === "dark" ? "#eee" : "#111";
  const primaryColor =
    themeMode === "dark" ? myPrimaryColor : darken(myPrimaryColor, 0.05);
  const errorMain = red[500];
  const shortTransitionDuration = 250;
  const shorterTransitionDuration = 150;
  const background = {
    default: themeMode === "dark" ? "#111" : "#ECEFF4",
    darker:
      themeMode === "dark" ? lighten("#000", 0.065) : darken("#fff", 0.05),
    dark: themeMode === "dark" ? darken(grey[900], 0.15) : grey[100],
    light:
      themeMode === "dark"
        ? alpha(darken(grey[900], 0.15), 0.35)
        : lighten(grey[100], 0.5),
  } as const;

  const yellowColor = themeMode === "dark" ? yellow[700] : yellow[800];
  const greenColor = themeMode === "dark" ? green[500] : green[600];
  const redColor = themeMode === "dark" ? red[700] : red[600];

  return {
    background,
    primaryColor,
    contrastText,
    errorMain,
    shortTransitionDuration,
    shorterTransitionDuration,
    yellowColor,
    greenColor,
    redColor,
  };
}

export function createMuiTheme(themeMode: PaletteMode) {
  const {
    background,
    contrastText,
    errorMain,
    greenColor,
    primaryColor,
    redColor,
    shortTransitionDuration,
    shorterTransitionDuration,
    yellowColor,
  } = generateTheme(themeMode);

  return createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: primaryColor,
      },
      secondary: {
        main: themeMode === "dark" ? grey[400] : grey[600],
      },
      error: {
        main: errorMain,
      },
      background,
      text: {
        primary: contrastText,
      },
      scrollbar: {
        thumb: themeMode === "light" ? darken(grey[300], 0.025) : grey[800],
        track:
          themeMode === "dark"
            ? lighten(background.default, 0.1)
            : lighten(background.default, 0.125),
      },
      yellow: {
        contrastText,
        main: yellowColor,
        dark: yellowColor,
        light: yellowColor,
      },
      red: {
        contrastText,
        main: redColor,
        dark: redColor,
        light: redColor,
      },
      green: {
        contrastText,
        main: greenColor,
        dark: greenColor,
        light: greenColor,
      },
      success: {
        main: greenColor,
      },
    },
    typography: {
      fontFamily: "'Raleway', system-ui",
    },
    transitions: {
      duration: {
        shorter: shorterTransitionDuration,
        short: shortTransitionDuration,
      },
    },
    components: {
      MuiAvatar: {
        styleOverrides: {
          root: {
            fontSize: "0.75rem",
            width: 30,
            height: 30,
          },
        },
      },
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            subtitle1: "span",
            subtitle2: "span",
          },
        },
        styleOverrides: {
          root: {
            lineHeight: 1.5,
          },
          h2: {
            fontSize: "2.5rem",
            lineHeight: 1.25,
            fontWeight: 700,
          },
          h3: {
            fontSize: "2rem",
            fontWeight: 600,
          },
          h4: {
            fontSize: "1.75rem",
            fontWeight: 600,
          },
          h5: {
            fontSize: "1.5rem",
            fontWeight: 600,
          },
          h6: {
            fontSize: "1.15rem",
            fontWeight: 600,
          },
          body2: {
            fontWeight: 500,
            opacity: 0.9,
          },
          subtitle1: {
            fontSize: ".9rem",
            fontWeight: 500,
          },
          subtitle2: {
            opacity: 0.75,
            fontSize: ".8rem",
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            fontWeight: 600,
          },
        },
      },
      MuiSvgIcon: {
        defaultProps: {
          fontSize: "small",
        },
        styleOverrides: {
          root: {
            cursor: "pointer",
          },
        },
      },
      MuiRadio: {
        defaultProps: disableRipple,
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: "inherit",
            },
          },
        },
      },
      MuiTooltip: {
        defaultProps: {
          arrow: true,
          placement: "top",
        },
        styleOverrides: {
          tooltip: {
            borderRadius: spacing(0.25),
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          multiline: {
            paddingTop: spacing(1),
            paddingBottom: spacing(1),
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          input: {
            paddingTop: spacing(2),
            paddingBottom: spacing(2),
          },
          inputMultiline: {
            padding: spacing(0),
            "&::-webkit-scrollbar": {
              width: "0.5em",
              height: "0.5em",
            },
            "&::-webkit-scrollbar-track": {
              background:
                themeMode === "dark"
                  ? lighten(background.default, 0.1)
                  : lighten(background.default, 0.175),
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor:
                themeMode === "light" ? darken(grey[300], 0.05) : grey[800],
            },
          },
          root: {
            borderRadius: spacing(0.25),
            "&.MuiInputBase-multiline": {
              padding: spacing(3),
              paddingTop: spacing(2),
            },
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            "&.Mui-error": {
              fontWeight: 500,
            },
          },
        },
      },
      MuiCheckbox: {
        defaultProps: disableRipple,
        styleOverrides: {
          root: {
            paddingTop: spacing(1.5),
            paddingBottom: spacing(1.5),
            paddingRight: spacing(1),
          },
        },
      },
      MuiIconButton: {
        defaultProps: disableRipple,
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            borderRadius: spacing(0.25),
            boxShadow: "none",
          },
        },
        defaultProps: {
          ...disableRipple,
          variant: "contained",
        },
      },
      MuiMenuItem: {
        defaultProps: disableRipple,
        styleOverrides: {
          root: {
            paddingTop: spacing(2),
            paddingBottom: spacing(2),
          },
        },
      },
      MuiMenu: {
        defaultProps: {
          elevation: 1,
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: spacing(0.25),
          },
          deleteIcon: {
            transition: `color ${shorterTransitionDuration}ms ease-in-out`,
            "&:hover": {
              color: errorMain,
              transition: `color ${shorterTransitionDuration}ms ease-in-out`,
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: "none",
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            "& .MuiTableCell-root": {
              backgroundColor: background.darker,
              fontWeight: 600,
            },
          },
        },
      },
      MuiFormControl: {
        defaultProps: {
          fullWidth: true,
        },
      },
      MuiTableBody: {
        styleOverrides: {
          root: {
            "& .MuiTableRow-root:nth-child(even)": {
              backgroundColor: background.light,
            },
          },
        },
      },
    },
  });
}
