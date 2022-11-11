"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { breakpoints, styles, textStyles } from "../styles/theme-config";

interface Props {
  children: React.ReactNode;
}

const theme = extendTheme({ styles, breakpoints, textStyles });

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ja">
      <head />
      <body>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </body>
    </html>
  );
}
