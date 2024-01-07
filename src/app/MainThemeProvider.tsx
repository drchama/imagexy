"use client";

import { ThemeProvider } from "@mui/material";
import { ReactNode } from "react";
import { createMainTheme } from "./createMainTheme";

export type MainThemeProviderProps = {
  children: ReactNode;
};

export const MainThemeProvider = ({ children }: MainThemeProviderProps) => {
  const theme = createMainTheme();

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
