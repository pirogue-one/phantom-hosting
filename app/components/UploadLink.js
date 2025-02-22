"use client"

import { useState } from "react"
import Image from "next/image"

export default function UploadLink({ id, password, isAlbum }) {
  const [copied, setCopied] = useState(false);
  const path = isAlbum ? 'album' :'picture';
  const link = `${process.env.NEXT_PUBLIC_BASE_URL}/${path}/${id}`;
  const preview = `${process.env.NEXT_PUBLIC_API_URL}/api/get_file/${id}?password=${password}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  };

  return (
    <div className="flex items-center space-x-2 w-full">
      {!isAlbum &&
      (<Image
                    src={preview || "/placeholder.svg"}
                    alt="Preview"
                    width={60}
                    height={60}
                    className="object-cover rounded"
                /> )}
      <input type="text" value={link} readOnly className="flex-grow p-2 border rounded" />
      <button onClick={copyToClipboard} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  )
}

