import StoreProvider from "./store-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme/theme";

import "./../../public/css/main.min.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Header />
            <StoreProvider>{children}</StoreProvider>
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
