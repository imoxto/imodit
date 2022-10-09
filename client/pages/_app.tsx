import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";

import { Document } from "../components/Document";
import { NavBar } from "../components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
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

  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider
        maxSnack={1}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        autoHideDuration={5000}
      >
        <Document>
          <NavBar />
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </Document>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
