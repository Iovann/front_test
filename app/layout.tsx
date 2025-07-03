import type { Metadata } from "next";
import Providers from "./providers";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});


export const metadata: Metadata = {
  title: "Gestionnaire d'étagères de livres | Soft Vodooz Test",
  description: "Application Next.js pour afficher, rechercher et organiser des livres par étagères. Test technique Soft Vodooz.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${montserrat.variable} font-montserrat`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}