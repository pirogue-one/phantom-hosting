import UploadForm from "./components/UploadForm";
import "./globals.css";
import { useTranslations } from 'next-intl';

export default function Home() {

  const t = useTranslations('HomePage');

  return (
    <div className="main-content">
      <div className="flex-col gap-0 items-center">
        <h1 className="phantom-title">PHANTOM</h1>
        <p className="phantom-title-subtitle text-[20px] text-center">{t('title-subtitle')}</p>
      </div>
      <UploadForm />
    </div>
  )
}

