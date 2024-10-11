import { UserProvider } from "@/context/user";
import "../globals.css";
import { LayoutProvider } from "./layoutProvider";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser-arcade-physics.min.js"></Script>
      </head>
      <body>
        <UserProvider>
          <LayoutProvider>{children}</LayoutProvider>
        </UserProvider>
      </body>
    </html>
  );
}
