'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import ImageGallery from '../../components/ImageGallery';

export default function AlbumPage({ params }) {
  const { upload_id } = params;
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordProtection, setPasswordProtection] = useState(false);
  const t = useTranslations('PicturePage');
  const [showError, setShowError] = useState(false);

  async function fetchData() {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/album/${upload_id}?password=${password}`;
      const res = await fetch(url);
      if (res.status === 403) {
        if (showError) {
          alert(t('wrongpassword'));
        }
        setShowError(true);
        setPasswordProtection(true);
        return;
      }

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.details ?? t("failed"));
      }
      setPasswordProtection(false);
      setData(result);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <div>{t('error')}{error}</div>;
  }

  if (!data && !passwordProtection) {
    return <div>{t('loading')}</div>;
  }

  return (
    <>
      {passwordProtection ? (
        <form className='flex gap-4 w-fit'
          onSubmit={async (e) => {
            e.preventDefault();
            await fetchData();
          }}
        >
          <input
            placeholder={t('password-ph')}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-10 py-2 rounded hover:bg-blue-600 feedback-btn"
          >
            {t('send-btn')}
          </button>
        </form>
      ) : (
        <div className='flex flex-col item-center'>
          <ImageGallery imageIds={data.images.map((el) => el.url)} />
          <div className="mt-8 flex flex-col item-center">
            <h2 className="text-xl font-bold mb-4 text-center">{t('description')}</h2>
            <textarea
              value={data.description}
              readOnly
              className="w-full p-2 border rounded"
              rows="4"
            />
          </div>
        </div>)}
    </>
  );
}

