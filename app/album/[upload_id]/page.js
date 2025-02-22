'use client';

import { useState, useEffect } from 'react';
import ImageGallery from '../../components/ImageGallery';

export default function AlbumPage({ params }) {
  const { upload_id } = params;
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/data.json');
        if (!res.ok) {
          throw new Error('Failed to fetch upload data');
        }
        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchData();
  }, [upload_id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Upload Details</h1>
      <ImageGallery imageIds={data.image_ids} />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Description</h2>
        <textarea
          value={data.description}
          readOnly
          className="w-full p-2 border rounded"
          rows="4"
        />
      </div>
    </div>
  );
}

