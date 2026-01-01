import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import './ProjectDetail.css'

const defaultProjects = [
  {
    id: 1,
    slug: 'crm-bot',
    category: 'TELEGRAM-БОТЫ',
    title: 'CRM-бот для приёма заказов',
    description: 'Автоматизация приёма и обработки заказов через Telegram с интеграцией 1С',
    fullDescription: 'Полноценная CRM-система на базе Telegram-бота. Автоматический приём заказов, интеграция с 1С, уведомления менеджерам, статистика продаж.',
    tech: ['Python', 'Aiogram', 'PostgreSQL', '1C'],
    image: '',
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
    image: '',
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
    image: '',
    link: ''
  }
]

export const ProjectDetail = () => {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    // Получаем все проекты
    let allProjects = defaultProjects
    
    const saved = localStorage.getItem('siteContent')
    if (saved) {
      try {
        const content = JSON.parse(saved)
        if (content.projects && content.projects.length > 0) {
          allProjects = content.projects
        }
      } catch (e) {
        console.error('Error loading project:', e)
      }
    }

    // Ищем проект по slug
    const found = allProjects.find(p => p.slug === slug)
    
    if (found) {
      setProject(found)
      setNotFound(false)
    } else {
      setNotFound(true)
    }
  }, [slug])

  // Если проект не найден - показываем сообщение
  if (notFound) {
    return (
      <div className="project-detail">
        <div className="project-detail__container">
          <Link to="/" className="project-detail__back">
            ← Назад на главную
          </Link>
          <div className="project-detail__error">
            <h1>Проект не найден</h1>
            <p>Возможно, он был удалён или изменён</p>
          </div>
        </div>
      </div>
    )
  }

  // Пока проект загружается
  if (!project) {
    return (
      <div className="project-detail">
        <div className="project-detail__container">
          <p style={{ color: 'var(--color-text-secondary)' }}>Загрузка...</p>
        </div>
      </div>
    )
  }

  // Отображаем проект
  return (
    <div className="project-detail">
      <div className="project-detail__container">
        <Link to="/" className="project-detail__back">
          ← Назад к проектам
        </Link>

        <div className="project-detail__header">
          <Badge variant="accent">{project.category}</Badge>
          <h1 className="project-detail__title">{project.title}</h1>
          <p className="project-detail__description">{project.description}</p>
        </div>

        {project.images && project.images.length > 0 && (
  <div className="project-detail__images">
    {project.images.map((image, index) => (
      <div key={index} className="project-detail__image">
        <img src={image} alt={`${project.title} - изображение ${index + 1}`} />
      </div>
    ))}
  </div>
)}


        <div className="project-detail__content">
          <h2>О проекте</h2>
          <p>{project.fullDescription}</p>
        </div>

        <div className="project-detail__tech">
          <h3>Технологии</h3>
          <div className="project-detail__tech-list">
            {project.tech.map(tech => (
              <span key={tech} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>

        {project.link && (
          <div className="project-detail__actions">
            <Button href={project.link} variant="primary">
              Открыть проект
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
