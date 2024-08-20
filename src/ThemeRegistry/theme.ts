// app/theme.ts
"use client";
import { Kanit } from "next/font/google";
import { extendTheme } from "@mui/joy/styles";

const kanit = Kanit({
  weight: ["100", "200", "300", "400", "600", "700", "800", "900"],
  subsets: ["latin"],
  adjustFontFallback: false,
  display: "swap",
});

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: "#F2F7FF",
          100: "#DCEBFE",
          200: "#BDDAFE",
          300: "#91C3FC",
          400: "#60A5FA",
          500: "#3479E8",
          600: "#2362EA",
          700: "#1D4FD7",
          800: "#1D3FAE",
          900: "#1E3B8A",
          solidBg: "var(--joy-palette-primary-600)",
          solidHoverBg: "var(--joy-palette-primary-500)",
          solidActiveBg: "var(--joy-palette-primary-400)",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          50: "#1D223F",
          100: "#0A318C",
          200: "#1347CC",
          300: "#1055EA",
          400: "#357AEA",
          500: "#2E88F6",
          600: "#50A1FF",
          700: "#7AB7FF",
          800: "#DCEBFE",
          900: "#F0F6FF",
          solidBg: "var(--joy-palette-primary-700)",
          solidColor: "var(--joy-palette-common-black)",
          solidHoverBg: "var(--joy-palette-primary-600)",
          solidActiveBg: "var(--joy-palette-primary-400)",
        },
        background: {
          body: "var(--joy-palette-common-black)",
          surface: "var(--joy-palette-neutral-900)",
        },
      },
    },
  },
  fontFamily: {
    body: kanit.style.fontFamily,
    display: kanit.style.fontFamily,
  },
  components: {
    // JoyButton: {
    //   styleOverrides: {
    //     root: ({ ownerState }) => ({
    //       ...(ownerState.color === 'primary' && {
    //         backgroundColor: "#543894",
    //       }),
    //     }),
    //   },
    // },
    JoyTypography: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          color: "#0B0D0E",
          fontFamily: kanit.style.fontFamily,
        }),
      },
    },
    // JoyDivider: {
    //   styleOverrides: {
    //     root: ({ ownerState }) => ({
    //       ...(ownerState.variant === "vertical" && {
    //         height: "100%",
    //         width: 1,
    //         background: "#f70000",
    //       }),
    //       ...(ownerState.variant === "horizontal" && {
    //         width: "100%",
    //         height: 1,
    //         background: "#f70000",
    //       }),
    //     }),
    //   },
    // },
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "solid" && {
            background:
              "linear-gradient(to right, rgba(57, 137, 229, 1), rgba(126, 185, 253, 1))",
            borderRadius: "12px",
            height: 48,
            fontFamily: kanit.style.fontFamily,
            fontWeight: 600,
            fontSize: 18,
          }),
          ...(ownerState.variant === "solid" &&
            ownerState.disabled && {
              background: "#F0F4F8",
              color: "#CDD7E1 !important",
              borderRadius: "12px",
              height: 48,
              fontFamily: kanit.style.fontFamily,
              fontWeight: 600,
              fontSize: 18,
            }),
          ...(ownerState.variant === "outlined" && {
            color: "#3989E5",
            stroke: "#A7CFFE",
            borderRadius: "12px",
            height: 48,
            fontFamily: kanit.style.fontFamily,
            fontWeight: 600,
            fontSize: 18,
          }),
        }),
      },
    },
    JoyChip: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "outlined" && {
            background: "#ECF5FF",
            borderColor: "#7EB9FD",
            color: "#3989E5",
            borderRadius: 20,
            height: 29,
            fontFamily: kanit.style.fontFamily,
            fontWeight: 600,
            fontSize: 18,
          }),
        }),
      },
    },
    JoyModal: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          background: "#0B0D0ECC",
        }),
      },
    },
    JoyModalDialog: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          width: "100%",
          margin: 0,
          borderRadius: "14px",
          padding: "16px",
        }),
      },
    },
    JoyDialogTitle: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          color: "#212121",
          justifyContent: "center",
          marginBottom: "16px",
        }),
      },
    },
    JoyDialogContent: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          marginBottom: "24px",
        }),
      },
    },
    JoyInput: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          borderRadius: "12px",
          border: "1px solid #DDE7EE",
          backgroundColor: ownerState.disabled ? "#F0F4F8" : "#FFFFFF",
          padding: "1px 2px 1px, 2px",
          height: 48,
          color: "#636B74",
        }),
      },
    },
  },
});

export default theme;

