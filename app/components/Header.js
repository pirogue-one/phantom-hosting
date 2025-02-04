'use client'

import Link from "next/link";
import {setUserLocale} from '@/services/locale';
import {useLocale} from 'next-intl';


export default function Header() {

  function onChange(e) {
    const locale = e.target.value;
    setUserLocale(locale);
  }
  
  const currentLang = useLocale();

  return (
    <header className="header">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          <img className="logo" src='/phantom-logo.png' />
        </Link>
        <img className='tor-icon' src='/tor-icon.png' />
        <select id="langs" onChange={onChange} defaultValue={currentLang}>
          <option value="ru">RU</option>
          <option value="en">EN</option>
        </select>
      </div>
    </header >
  )
}

