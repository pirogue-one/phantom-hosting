"use client"

import { useState } from "react"

export default function UploadLink({ id }) {
  const [copied, setCopied] = useState(false)
  const link = `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${id}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center space-x-2">
      <input type="text" value={link} readOnly className="flex-grow p-2 border rounded" />
      <button onClick={copyToClipboard} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  )
}

