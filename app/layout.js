import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

export const metadata = {
  title: "Image Hosting",
  description: "Upload and share your images",
}

export default async function RootLayout({ children }) {

  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="flex flex-col min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

