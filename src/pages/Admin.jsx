import { useState, useEffect } from 'react'
import './Admin.css'

const DEFAULT_PASSWORD = 'admin2026'

export const Admin = () => {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [content, setContent] = useState({
    hero: {
      title: 'Тимур, 23 года',
      subtitle: 'Python-разработчик',
      tagline: 'Автоматизация & Telegram-боты',
      description: 'Создаю функциональные решения для бизнеса: от простых ботов для приёма заказов до сложных систем с интеграцией CRM, базами данных и внешними API.'
    },
    projects: [
      {
        id: 1,
        slug: 'crm-bot',
        category: 'TELEGRAM-БОТЫ',
        title: 'CRM-бот для приёма заказов',
        description: 'Автоматизация приёма и обработки заказов через Telegram с интеграцией 1С',
        fullDescription: 'Полноценная CRM-система на базе Telegram-бота. Автоматический приём заказов, интеграция с 1С, уведомления менеджерам, статистика продаж.',
        tech: ['Python', 'Aiogram', 'PostgreSQL', '1C'],
        images: [],
        link: ''
      },
      {
        id: 2,
        slug: 'parser',
        category: 'ПАРСИНГ',
        title: 'Парсер маркетплейсов',
        description: 'Автоматический сбор и анализ данных с Wildberries, Ozon, Яндекс.Маркет',
        fullDescription: 'Система автоматического парсинга товаров, цен и остатков с популярных маркетплейсов. Выгрузка в Excel, аналитика, мониторинг конкурентов.',
        tech: ['Python', 'Selenium', 'BeautifulSoup', 'Excel'],
        images: [],
        link: ''
      },
      {
        id: 3,
        slug: 'mailing-bot',
        category: 'TELEGRAM-БОТЫ',
        title: 'Система автоматических рассылок',
        description: 'Telegram-бот для массовых рассылок с таргетингом и аналитикой',
        fullDescription: 'Умная система рассылок в Telegram. Сегментация аудитории, таргетинг по интересам, A/B тестирование, детальная аналитика открытий и конверсий.',
        tech: ['Python', 'Aiogram', 'PostgreSQL', 'Analytics'],
        images: [],
        link: ''
      }
    ]
  })

  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }

    const saved = localStorage.getItem('siteContent')
    if (saved) {
      try {
        setContent(JSON.parse(saved))
      } catch (e) {
        console.error('Error loading content:', e)
      }
    }
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === DEFAULT_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem('adminAuth', 'true')
    } else {
      alert('Неверный пароль')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('adminAuth')
    setPassword('')
  }

  const handleSave = () => {
    localStorage.setItem('siteContent', JSON.stringify(content))
    alert('✅ Изменения сохранены')
  }

  const updateHero = (field, value) => {
    setContent(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }))
  }

  const updateProject = (index, field, value) => {
    setContent(prev => ({
      ...prev,
      projects: prev.projects.map((p, i) => 
        i === index ? { ...p, [field]: value } : p
      )
    }))
  }

  const addProject = () => {
    const newId = Math.max(...content.projects.map(p => p.id), 0) + 1
    setContent(prev => ({
      ...prev,
      projects: [...prev.projects, {
        id: newId,
        slug: `project-${newId}`,
        category: 'НОВЫЙ',
        title: 'Новый проект',
        description: 'Описание проекта',
        fullDescription: 'Полное описание проекта',
        tech: ['Python'],
        images: [],
        link: ''
      }]
    }))
  }

  const deleteProject = (index) => {
    if (confirm('Удалить проект?')) {
      setContent(prev => ({
        ...prev,
        projects: prev.projects.filter((_, i) => i !== index)
      }))
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <form onSubmit={handleLogin} className="admin-login__form">
          <h1>Админ-панель</h1>
          <p className="admin-login__description">Вход для редактирования контента</p>
          <input
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          <button type="submit">Войти</button>
        </form>
      </div>
    )
  }

  return (
    <div className="admin">
      <div className="admin__header">
        <h1>Панель управления контентом</h1>
        <div className="admin__actions">
          <button onClick={handleSave} className="admin__btn admin__btn--primary">
            Сохранить
          </button>
          <a href="/" className="admin__btn admin__btn--secondary">
            На сайт
          </a>
          <button onClick={handleLogout} className="admin__btn admin__btn--ghost">
            Выйти
          </button>
        </div>
      </div>

      <div className="admin__content">
        {/* БЛОК: Главный экран */}
        <div className="admin__section">
          <h2>Главный экран</h2>
          
          <div className="admin__field">
            <label>Заголовок</label>
            <input
              type="text"
              value={content.hero.title}
              onChange={(e) => updateHero('title', e.target.value)}
            />
          </div>

          <div className="admin__field">
            <label>Подзаголовок (с анимацией)</label>
            <input
              type="text"
              value={content.hero.subtitle}
              onChange={(e) => updateHero('subtitle', e.target.value)}
            />
          </div>

          <div className="admin__field">
            <label>Слоган</label>
            <input
              type="text"
              value={content.hero.tagline}
              onChange={(e) => updateHero('tagline', e.target.value)}
            />
          </div>

          <div className="admin__field">
            <label>Описание</label>
            <textarea
              rows={4}
              value={content.hero.description}
              onChange={(e) => updateHero('description', e.target.value)}
            />
          </div>
        </div>

        {/* БЛОК: Проекты */}
        <div className="admin__section">
          <div className="admin__section-header">
            <h2>Проекты</h2>
            <button onClick={addProject} className="admin__btn admin__btn--secondary">
              + Добавить
            </button>
          </div>

          {content.projects.map((project, index) => (
            <div key={project.id} className="admin__project">
              <div className="admin__project-header">
                <h3>Проект #{index + 1}</h3>
                <button 
                  onClick={() => deleteProject(index)}
                  className="admin__btn admin__btn--danger"
                >
                  Удалить
                </button>
              </div>

              <div className="admin__row">
                <div className="admin__field">
                  <label>Slug (для URL)</label>
                  <input
                    type="text"
                    value={project.slug}
                    onChange={(e) => updateProject(index, 'slug', e.target.value)}
                  />
                </div>

                <div className="admin__field">
                  <label>Категория</label>
                  <input
                    type="text"
                    value={project.category}
                    onChange={(e) => updateProject(index, 'category', e.target.value)}
                  />
                </div>
              </div>

              <div className="admin__field">
                <label>Название</label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => updateProject(index, 'title', e.target.value)}
                />
              </div>

              <div className="admin__field">
                <label>Краткое описание (для карточки)</label>
                <textarea
                  rows={2}
                  value={project.description}
                  onChange={(e) => updateProject(index, 'description', e.target.value)}
                />
              </div>

              <div className="admin__field">
                <label>Полное описание (для страницы проекта)</label>
                <textarea
                  rows={4}
                  value={project.fullDescription}
                  onChange={(e) => updateProject(index, 'fullDescription', e.target.value)}
                />
              </div>

              <div className="admin__field">
                <label>Технологии (через запятую)</label>
                <input
                  type="text"
                  value={project.tech.join(', ')}
                  onChange={(e) => updateProject(index, 'tech', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                />
              </div>

              <div className="admin__field">
                <label>Изображения (по одному URL на строку)</label>
                <textarea
                  rows={4}
                  value={project.images ? project.images.join('\n') : ''}
                  onChange={(e) => updateProject(index, 'images', e.target.value.split('\n').map(url => url.trim()).filter(Boolean))}
                  placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                />
                <small style={{ 
                  display: 'block', 
                  marginTop: 'var(--space-xs)', 
                  color: 'var(--color-text-tertiary)',
                  fontSize: 'var(--text-xs)'
                }}>
                  Каждое изображение с новой строки. Если 1 изображение — на всю ширину. Если 2+ — сетка 2 колонки.
                </small>
              </div>

              <div className="admin__field">
                <label>Ссылка на проект</label>
                <input
                  type="text"
                  value={project.link}
                  onChange={(e) => updateProject(index, 'link', e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
