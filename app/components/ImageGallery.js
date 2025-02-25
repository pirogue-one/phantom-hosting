"use client"

import { useState } from "react"
import Image from "next/image"

export default function ImageGallery({ imageIds }) {
  const [selectedImage, setSelectedImage] = useState(imageIds[0])

  return (
    <div className="flex flex-col item-center">
      <div className="mb-4">
        <Image
          src= {`${process.env.NEXT_PUBLIC_API_URL}/api/get_file/${selectedImage}`}
          alt="Selected image"
          width={800}
          height={600}
          className="object-contain"
        />
      </div>
      <div className="grid grid-cols-5 gap-4">
        {imageIds.map((id) => (
          <Image
            key={id}
            src={`${process.env.NEXT_PUBLIC_API_URL}/api/get_file/${id}`}
            alt={`Thumbnail ${id}`}
            width={150}
            height={150}
            className={`object-cover cursor-pointer ${selectedImage === id ? "border-4 border-blue-500" : ""}`}
            onClick={() => setSelectedImage(id)}
          />
        ))}
      </div>
    </div>
  )
}

