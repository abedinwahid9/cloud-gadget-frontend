import StoreProvider from "@/lib/redux/StoreProvider";
import { baiJamjuree, geistMono } from "./fonts/fonts";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/lib/tanstackprovider/Tanstackprovider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${baiJamjuree.variable || ""} ${
          geistMono.variable || ""
        }  antialiased `}
        cz-shortcut-listen="true"
      >
        <StoreProvider>
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </QueryProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
