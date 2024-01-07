import { createTheme } from "@mui/material";
import { Noto_Sans_JP } from "next/font/google";

const notoSansJp = Noto_Sans_JP({ subsets: ["latin"] });

export const createMainTheme = () => {
  return createTheme({
    typography: {
      fontFamily: notoSansJp.style.fontFamily,
    },
  });
};
