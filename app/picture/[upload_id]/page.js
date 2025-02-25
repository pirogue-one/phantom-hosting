'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function PicturePage({ params }) {
  const { upload_id } = params;
  const [data, setData] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [error, setError] = useState('');
  const [passwordProtection, setPasswordProtection] = useState(false);
  const [password, setPassword] = useState('');
  const t = useTranslations('PicturePage');

  async function fetchData() {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/get_file/${upload_id}?password=${password}`;
      const res = await fetch(url);
    
      if (res.status === 403) {
        alert(t('wrongpassword'));
        setPasswordProtection(true);
        return;
      }

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.details ?? t("failed"));
      }
      setPasswordProtection(false);
      setImageSrc(url);
      //todo: file info
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

  if (!imageSrc && !passwordProtection) {
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
        <div>
          <div className="mb-4">
            <Image
              src={imageSrc}
              alt="Selected image"
              width={800}
              height={600}
              className="object-contain"
            />
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-center">{t('description')}</h2>
            <textarea
              value={data?.description || ''}
              readOnly
              className="w-full p-2 border rounded"
              rows="4"
            />
          </div>
        </div>
      )}
    </>
  );
}
