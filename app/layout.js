import Header from "./components/Header"
import Footer from "./components/Footer"
import "./globals.css"

export const metadata = {
  title: "Image Hosting",
  description: "Upload and share your images",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

