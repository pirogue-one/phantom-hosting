import ImageGallery from "../../components/ImageGallery"

async function getUploadData(upload_id) {
  const res = await fetch(`${process.env.API_URL}/get_image_ids/${upload_id}`)
  if (!res.ok) {
    throw new Error("Failed to fetch upload data")
  }
  return res.json()
}

export default async function UploadPage({ params }) {
  const { upload_id } = params
  const data = await getUploadData(upload_id)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Upload Details</h1>
      <ImageGallery imageIds={data.image_ids} />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Description</h2>
        <textarea value={data.description} readOnly className="w-full p-2 border rounded" rows="4" />
      </div>
    </div>
  )
}

