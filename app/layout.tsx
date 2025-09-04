import StoreProvider from "@/lib/redux/StoreProvider";
import { baiJamjuree, geistMono } from "./fonts/fonts";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${baiJamjuree.variable} ${geistMono.variable}  antialiased `}
        cz-shortcut-listen="true"
      >
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
