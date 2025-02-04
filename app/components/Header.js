import Link from "next/link"

export default function Header() {
  return (
    <header className="header">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
        <img className="logo" src='/phantom-logo.png' />
        </Link>
      <img className='tor-icon' src='/tor-icon.png' />
        <nav>
          <Link href="/" className="ml-4">
            Home
          </Link>
        </nav>
      </div>
    </header>
  )
}

