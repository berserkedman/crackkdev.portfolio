import { useEffect, useState } from 'react'
import { Button } from '../ui/Button'
import './Hero.css'

export const Hero = () => {
  const [content, setContent] = useState({
    title: 'Тимур, 23 года',
    subtitle: 'Python-разработчик',
    tagline: 'Автоматизация & Telegram-боты',
    description: 'Создаю функциональные решения для бизнеса: от простых ботов для приёма заказов до сложных систем с интеграцией CRM, базами данных и внешними API.'
  })

  useEffect(() => {
    const saved = localStorage.getItem('siteContent')
    if (saved) {
      const data = JSON.parse(saved)
      if (data.hero) {
        setContent(data.hero)
      }
    }
  }, [])

  return (
    <section id="hero" className="hero">
      <div className="hero__container">
        <div className="hero__badge">
          <span className="hero__status"></span>
          Доступен для проектов
        </div>

        <h1 className="hero__title">
          {content.title}
          <br />
          <span className="hero__highlight">{content.subtitle}</span>
        </h1>

        <p className="hero__subtitle">
          {content.tagline}
        </p>

        <p className="hero__description">
          {content.description}
        </p>

        <ul className="hero__features">
          <li>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13 4L6 11L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Telegram-боты любой сложности
          </li>
          <li>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13 4L6 11L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Автоматизация рутинных задач
          </li>
          <li>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13 4L6 11L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Парсинг данных и веб-скрейпинг
          </li>
          <li>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13 4L6 11L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Работа с API и базами данных
          </li>
        </ul>

        <div className="hero__tech">
          <span>Python</span>
          <span>Aiogram</span>
          <span>Selenium</span>
          <span>PostgreSQL</span>
          <span>JavaScript</span>
        </div>

        <div className="hero__actions">
          <Button href="https://t.me/neffixlab" variant="primary">
            Написать в Telegram
          </Button>
          <Button href="https://kwork.ru/user/neffixlab" variant="secondary">
            Заказать на Kwork
          </Button>
        </div>
      </div>
    </section>
  )
}
