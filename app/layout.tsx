// app/layout.tsx
import AppProviders from "./providers";
import "./index.css";


export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <body>
    <AppProviders>{children}</AppProviders>
    </body>
    </html>
  );
}
