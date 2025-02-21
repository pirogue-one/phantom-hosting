"use client"

import { useSearchParams } from "next/navigation"
import UploadLink from "../components/UploadLink"

export default function Success({result, password, isAlbum}) {
  console.log(result)
  console.log(password)
  return (
    <div className="flex flex-col items-center max-w-[880px]">
      <h1 className="text-3xl font-bold mb-4 mt-2">Upload Successful</h1>
      <div className="space-y-4">
        {result.map((uploaded) => (
          <UploadLink key={uploaded.url} id={uploaded.url} password={password} isAlbum={isAlbum} />
        ))}
      </div>
    </div>
  )
}

