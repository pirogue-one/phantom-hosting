'use client';

import { useTranslations } from 'next-intl';


export default function FeedbackForm() {

  const t = useTranslations('FeedbackForm');

  return (
    <div className='form-container'>
      <div className='form-content'>
        <div className='feedback-text-container'>
          <p className='feedback-main-text'>{t('feedback')}</p>
          <p className='feedback-text'>{t('feedback-form')}</p>
        </div>
        <form className='form-feedback'>
          <div className='feedback-container'>
            <label className='feedback-label' for="name">{t('feedback-name')}</label>
            <input type="text" name="name" id="name"></input>
          </div>
          <div className='feedback-container'>
            <label className='feedback-label' for="email">{t('feedback-email')}</label>
            <input type="text" name="email" id="email"></input>
          </div>
          <div className='feedback-container'>
            <label className='feedback-label' for="description">{t('feedback-description')}</label>
            <textarea rows={4} id="description"
            />
          </div>
          <button className='bg-blue-500 text-white px-10 py-2 rounded hover:bg-blue-600 feedback-btn'>{t('feedback-button')}</button>
        </form>
      </div>
    </div>
  )
}
