import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          ImageHost
        </Link>
        <nav>
          <Link href="/" className="ml-4">
            Home
          </Link>
        </nav>
      </div>
    </header>
  )
}

