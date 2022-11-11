import NextHead from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { styles, breakpoints, textStyles } from "../styles/theme-config";
import type { AppProps } from "next/app";

const theme = extendTheme({ styles, breakpoints, textStyles });

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <div>
      <NextHead>
        <title>JJ PFP</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" href="/image/favicon.jpg" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta property="og:title" content="JJ PFP" />
        <meta property="og:description" content="JJ's PFP History" />
        <meta property="og:url" content="https://pfp.konojunya.com" />
        <meta
          property="og:image"
          content="https://pfp.konojunya.com/image/ogp.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@konojunya" />
        <meta name="twitter:description" content="JJ's PFP History" />
        <meta name="twitter:title" content="JJ PFP" />
      </NextHead>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </div>
  );
};

export default App;
