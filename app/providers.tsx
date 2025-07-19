"use client";

import * as React from "react";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {CacheProvider} from "@emotion/react";
import createCache from "@emotion/cache";
import theme from "./theme";
import {Provider} from "jotai";
import Header from "@/components/Header/Header.tsx";

const createEmotionCache = () => {
  return createCache({key: "css", prepend: true});
};

export default function AppProviders({children}) {
  const [emotionCache] = React.useState(() => createEmotionCache());

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Provider>
          <Header/>
          {children}
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}