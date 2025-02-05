"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageDropzone from "./ImageDropzone";
import OptionCheckbox from "./OptionCheckbox";
import NumericInput from "./NumericInput";
import { useTranslations } from 'next-intl';

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
    views: "",
    days: "",
    width: "",
    height: "",
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
  const t = useTranslations('UploadForm');

  return (
    <form onSubmit={handleSubmit} className="space-y-6 border-2 rounded-lg p-6 border-gray-300 max-w-[998px]">
      <div className="instruction flex-col items-center">
        <p className="text-[14px] text-center">{t('instruction-1')}</p>
        <p className="text-[14px] text-center">{t('instruction-2')}</p>
        <p className="text-[14px] text-center">{t('instruction-3')}</p>
        <p className="text-[14px] text-center">{t('instruction-4')}</p>
        <p className="text-[14px] text-center">{t('instruction-5')}</p>

      </div>
      <ImageDropzone images={images} setImages={setImages} />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder={t('descr-ph')}
        className="w-full p-2 border-2 rounded-lg border-gray-300"
        rows="2"
      />
      <div className="image-settings flex flex-wrap gap-x-10 gap-y-4">
        <OptionCheckbox
          label={t('password-l')}
          checked={options.passwordProtection}
          onChange={() => handleOptionChange("passwordProtection")}
        >
          {options.passwordProtection && (
            <input
              placeholder={t('password-ph')}
              type="password"
              value={values.password}
              onChange={(e) => handleValueChange("password", e.target.value)}
              className="ml-4 p-2 border rounded"
            />
          )}
        </OptionCheckbox>
        <OptionCheckbox
          label={t('days-to-delete-l')}
          checked={options.deleteAfterViews}
          onChange={() => handleOptionChange("deleteAfterViews")}
        >
          {options.deleteAfterViews && (
            <NumericInput placeholder={t('days-to-delete-ph')} value={values.views} onChange={(value) => handleValueChange("views", value)} min={1} />
          )}
        </OptionCheckbox>
        <OptionCheckbox
          label={t('views-to-delete-l')}
          checked={options.deleteAfterDays}
          onChange={() => handleOptionChange("deleteAfterDays")}
        >
          {options.deleteAfterDays && (
            <NumericInput placeholder={t('views-to-delete-ph')} value={values.days} onChange={(value) => handleValueChange("days", value)} min={1} />
          )}
        </OptionCheckbox>
        <OptionCheckbox
          label={t('size-pl')}
          checked={options.changeImageSize}
          onChange={() => handleOptionChange("changeImageSize")}
        >
          {options.changeImageSize && (
            <div className="size-inputs flex gap-2">
              <NumericInput
                placeholder={t('width')}
                value={values.width}
                onChange={(value) => handleValueChange("width", value)}
                min={1}
              />
              <NumericInput
                placeholder={t('height')}
                value={values.height}
                onChange={(value) => handleValueChange("height", value)}
                min={1}

              />
            </div>
          )}
        </OptionCheckbox>
        <OptionCheckbox
          label={t('album-pl')}
          checked={options.createAlbum}
          onChange={() => handleOptionChange("createAlbum")}
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-10 py-2 rounded hover:bg-blue-600 upload-files-btn">
      {t('upl-btn')}
      </button>
    </form>
  )
}

