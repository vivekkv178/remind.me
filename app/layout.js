import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
import PrelineScript from "@/components/Prelinescript";
import StoreProvider from "@/components/StoreProvider";
import UserProvider from "@/components/UserProvider";
import MadeWith from "@/components/UI/Madewith";
import "react-toastify/dist/ReactToastify.css";
import "@vivekkv178/library/dist/style.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "remind.me | No Forgetting Anymore",
  description: "Notifications for your Events",
  "application-name": "remind.me",
  "apple-mobile-web-app-capable": "yes",
  "apple-mobile-web-app-status-bar-style": "default",
  "apple-mobile-web-app-title": "remind.me",
  description: "No Forgetting Anymore",
  "format-detection": "telephone=no",
  "mobile-web-app-capable": "yes",
  "msapplication-config": "/icon-192x192.png",
  "msapplication-TileColor": "#2B5797",
  "msapplication-tap-highlight": "no",
  "theme-color": "#000000",
  openGraph: {
    title: "remind.me",
    description: "No Forgetting Anymore",
    url: "https://remind-me-six.vercel.app/",
    siteName: "remind.me",
    images: [
      {
        url: "/icon-192x192.png", // Must be an absolute URL
        width: 192,
        height: 192,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/icon-192x192.png" },
      { url: "/icon-256x256.png" },
      { url: "/icon-384x384.png" },
      { url: "/icon-512x512.png" },
    ],
    shortcut: ["/shortcut-icon.png"],
    apple: [
      { url: "/icon-192x192.png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StoreProvider>
            <UserProvider>{children}</UserProvider>
          </StoreProvider>
        </ThemeProvider>
        <MadeWith />
      </body>
      <PrelineScript />
    </html>
  );
};

export default RootLayout;
