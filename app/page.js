import UploadForm from "./components/UploadForm"
import "./globals.css"

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Upload Your Images</h1>
      <UploadForm />
    </div>
  )
}

