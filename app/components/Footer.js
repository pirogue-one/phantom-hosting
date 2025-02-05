'use client';

import Link from "next/link";
import { useTranslations } from 'next-intl';


export default function Footer() {

  const t = useTranslations('Footer');

  return (
    <footer className='footer'>
      <p className='footer-text'>{t('administration')}</p>
      <p className='footer-text'>{t('contacts-footer')}&nbsp;<Link className='footer-text-link' href="/feedback">{t('footer-link')}</Link>
      </p>
      <br />
      <p className='footer-text-down'>{t('footer-text-down')}</p>
    </footer>
  )
}

