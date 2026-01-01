import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import './Projects.css'

const defaultProjects = [
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

export const Projects = () => {
  const [projects, setProjects] = useState(defaultProjects)

  useEffect(() => {
    const saved = localStorage.getItem('siteContent')
    if (saved) {
      try {
        const content = JSON.parse(saved)
        if (content.projects && content.projects.length > 0) {
          setProjects(content.projects)
        }
      } catch (e) {
        console.error('Error loading projects:', e)
      }
    }
  }, [])

  return (
    <section id="projects" className="projects">
      <div className="projects__container">
        <div className="projects__header">
          <h2 className="projects__title">Избранные проекты</h2>
          <p className="projects__description">
            Реализованные решения для бизнеса и автоматизации
          </p>
        </div>

        <div className="projects__grid">
          {projects.map(project => (
            <Link key={project.id} to={`/projects/${project.slug}`} className="project-link">
              <Card hover>
                <div className="project-card">
                  <Badge variant="accent">{project.category}</Badge>
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__description">{project.description}</p>
                  <div className="project-card__tech">
                    {project.tech.map(tech => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
