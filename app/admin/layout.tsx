import { UserProvider } from "@/context/user";
import "../globals.css";
import LayoutProvider from "@/app/admin/layoutProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <LayoutProvider>{children}</LayoutProvider>
        </UserProvider>
      </body>
    </html>
  );
}
