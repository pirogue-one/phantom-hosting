"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function ImagePreview({ file, onRemove }) {
    const [preview, setPreview] = useState(null)

    useEffect(() => {
        const objectUrl = URL.createObjectURL(file)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [file])

    const handleRemove = (e) => {
        e.stopPropagation() // Prevent the event from bubbling up to the dropzone
        onRemove()
    }

    return (
        <div className="relative" onClick={(e)=> e.stopPropagation()}>
            {preview && (
                <Image
                    src={preview || "/placeholder.svg"}
                    alt="Preview"
                    width={100}
                    height={100}
                    className="object-cover rounded"
                />
            )}
            <button type="button"
                onClick={handleRemove}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
            >
                ×
            </button>
        </div>
    )
}
