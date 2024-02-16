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
