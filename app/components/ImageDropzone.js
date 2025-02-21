"use client"

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import ImagePreview from "./ImagePreview";
import { useTranslations } from 'next-intl';

export default function ImageDropzone({ images, setImages }) {
    const onDrop = useCallback(
        (acceptedFiles) => {
            const imageFiles = acceptedFiles.filter(file => file.type.startsWith('image/'))
            setImages((prev) => [...prev, ...imageFiles])
        },
        [setImages],
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': []
        },
        multiple: true,
    })

    const removeImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index))
    }

    const t = useTranslations('UploadForm');


    return (
        <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
        >
            <input {...getInputProps()} required />
            {images.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                    {images.map((file, index) => (
                        <ImagePreview key={index} file={file} onRemove={() => removeImage(index)} />
                    ))}
                </div>
            ) : (
                <p>{isDragActive ? "Drop the images here" : t('dropzone')}</p>
            )}
        </div>
    )
}
