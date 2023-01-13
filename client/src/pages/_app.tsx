import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import { useEffect, useState } from "react";

import { Document } from "../components/Document";
import { NavBar } from "../components/Navbar";
import { ImoditThemeProvider } from "../components/ThemeMode";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnMount: false,
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
    mutations: {
      retry: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ImoditThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Document>
          <SnackbarProvider
            maxSnack={1}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            autoHideDuration={5000}
          >
            <NavBar />
            <Component {...pageProps} />
            <ReactQueryDevtools />
          </SnackbarProvider>
        </Document>
      </QueryClientProvider>
    </ImoditThemeProvider>
  );
}

export default MyApp;
