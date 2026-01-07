import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import './Header.css'

export const Header = () => {
  const location = useLocation()
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    // Если мы НЕ на главной странице - не запускаем observer
    if (location.pathname !== '/') {
      setActiveSection('')
      return
    }

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    }

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    const sections = document.querySelectorAll('section[id]')
    
    sections.forEach(section => observer.observe(section))

    return () => observer.disconnect()
  }, [location.pathname])

  const scrollToSection = (id) => {
    // Если мы не на главной - сначала переходим туда
    if (location.pathname !== '/') {
      window.location.href = '/#' + id
      return
    }

    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Определяем активный пункт меню
  const isActive = (section) => {
    // Если на главной странице - используем activeSection из observer
    if (location.pathname === '/') {
      return activeSection === section
    }
    // Если на странице проекта - не подсвечиваем ничего
    return false
  }

  return (
    <header className="header">
      <div className="header__container">
        <a href="/" className="header__logo">
          Тимур
        </a>

        <nav className="header__nav">
          <button
            onClick={() => scrollToSection('hero')}
            className={`header__link ${isActive('hero') ? 'header__link--active' : ''}`}
          >
            Главная
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className={`header__link ${isActive('projects') ? 'header__link--active' : ''}`}
          >
            Проекты
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className={`header__link ${isActive('about') ? 'header__link--active' : ''}`}
          >
            Обо мне
          </button>
          <a 
            href="https://t.me/neffixlab_reviews" 
            className="header__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Отзывы
          </a>
        </nav>

        <div className="header__actions">
          <ThemeToggle />
          <a 
            href="https://t.me/scrackdev"
            className="header__cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            Написать
          </a>
        </div>
      </div>
    </header>
  )
}
