import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SelectedMoviesProvider } from "./context/movies-context";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recomendador de Películas",
  description: "Encuentra recomendaciones de películas basadas en tus gustos",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
         <SelectedMoviesProvider>
        {children}
        </SelectedMoviesProvider>
        </body>
    </html>
  );
}
