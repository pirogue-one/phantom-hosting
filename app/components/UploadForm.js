"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ImageDropzone from "./ImageDropzone"
import OptionCheckbox from "./OptionCheckbox"
import NumericInput from "./NumericInput"

export default function UploadForm() {
  const router = useRouter()
  const [description, setDescription] = useState("")
  const [images, setImages] = useState([])
  const [options, setOptions] = useState({
    passwordProtection: false,
    deleteAfterViews: false,
    deleteAfterDays: false,
    changeImageSize: false,
    createAlbum: false,
  })
  const [values, setValues] = useState({
    password: "",
    views: 1,
    days: 1,
    width: 800,
    height: 600,
  })

  const handleOptionChange = (option) => {
    setOptions((prev) => ({ ...prev, [option]: !prev[option] }))
  }

  const handleValueChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    console.log(e)
    e.preventDefault()
    const formData = new FormData()
    formData.append("description", description)
    images.forEach((image, index) => {
      formData.append(`image${index}`, image)
    })
    Object.entries(options).forEach(([key, value]) => {
      formData.append(key, value)
    })
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value)
    })

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
        method: "POST",
        body: formData,
      })
      const data = await response.json()
      router.push(`/success?ids=${data.ids.join(",")}`)
    } catch (error) {
      router.push("/error")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ImageDropzone images={images} setImages={setImages} />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full p-2 border rounded"
        rows="4"
      />
      <div className="space-y-4">
        <OptionCheckbox
          label="Password Protection"
          checked={options.passwordProtection}
          onChange={() => handleOptionChange("passwordProtection")}
        >
          {options.passwordProtection && (
            <input
              type="password"
              value={values.password}
              onChange={(e) => handleValueChange("password", e.target.value)}
              className="ml-4 p-2 border rounded"
            />
          )}
        </OptionCheckbox>
        <OptionCheckbox
          label="Delete after N views"
          checked={options.deleteAfterViews}
          onChange={() => handleOptionChange("deleteAfterViews")}
        >
          {options.deleteAfterViews && (
            <NumericInput value={values.views} onChange={(value) => handleValueChange("views", value)} min={1} />
          )}
        </OptionCheckbox>
        <OptionCheckbox
          label="Delete after N days"
          checked={options.deleteAfterDays}
          onChange={() => handleOptionChange("deleteAfterDays")}
        >
          {options.deleteAfterDays && (
            <NumericInput value={values.days} onChange={(value) => handleValueChange("days", value)} min={1} />
          )}
        </OptionCheckbox>
        <OptionCheckbox
          label="Change image size"
          checked={options.changeImageSize}
          onChange={() => handleOptionChange("changeImageSize")}
        >
          {options.changeImageSize && (
            <div className="ml-4 space-x-2">
              <NumericInput
                value={values.width}
                onChange={(value) => handleValueChange("width", value)}
                min={1}
                placeholder="Width"
              />
              <NumericInput
                value={values.height}
                onChange={(value) => handleValueChange("height", value)}
                min={1}
                placeholder="Height"
              />
            </div>
          )}
        </OptionCheckbox>
        <OptionCheckbox
          label="Create album"
          checked={options.createAlbum}
          onChange={() => handleOptionChange("createAlbum")}
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Upload
      </button>
    </form>
  )
}

