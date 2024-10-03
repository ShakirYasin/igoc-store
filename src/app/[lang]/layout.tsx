import { localizedData } from "@/constants/locales";
import ReactQueryProvider from "@/provider/ReactQueryProvider";
import { localizeObject } from "@/utils/site.utils";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;

  const metaDataLocalized = localizeObject(localizedData.metadata.home, lang);

  return {
    title: metaDataLocalized.title,
    description: metaDataLocalized.description,
  };
}

type Props = {
  children: React.ReactNode;
  params: { lang: string };
};
export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ms" }];
}

export default function RootLayout({ children, params: { lang } }: Props) {
  return (
    <html lang={lang}>
      <head>
        <link rel="icon" href="/images/favicons/favicon.ico" sizes="any" />
      </head>
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
