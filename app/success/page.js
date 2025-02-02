"use client"

import { useSearchParams } from "next/navigation"
import UploadLink from "../components/UploadLink"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const ids = searchParams.get("ids")?.split(",") || []

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Upload Successful</h1>
      <div className="space-y-4">
        {ids.map((id) => (
          <UploadLink key={id} id={id} />
        ))}
      </div>
    </div>
  )
}

