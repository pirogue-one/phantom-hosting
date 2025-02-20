"use client"

import { useSearchParams } from "next/navigation"
import UploadLink from "../components/UploadLink"

export default function Success({result, password}) {
  console.log(result)
  console.log(password)
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Upload Successful</h1>
      <div className="space-y-4">
        {result.map((uploaded) => (
          <UploadLink key={uploaded.url} id={uploaded.url} />
        ))}
      </div>
    </div>
  )
}

