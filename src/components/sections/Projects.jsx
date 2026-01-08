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
    fullDescription: 'Полноценная CRM-система на базе Telegram-бота.',
    tech: ['Python', 'Aiogram', 'PostgreSQL', '1C'],
    images: [],
    link: ''
  }
]

export const Projects = () => {
  const [projects, setProjects] = useState(defaultProjects)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Загружаем данные из projects.json
    const loadProjects = async () => {
      try {
        const res = await fetch('/data/projects.json')
        if (res.ok) {
          const data = await res.json()
          if (data.projects && data.projects.length > 0) {
            setProjects(data.projects)
          }
        }
      } catch (error) {
        console.error('Ошибка загрузки проектов:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  if (loading) {
    return (
      <section id="projects" className="projects">
        <div className="projects__container">
          <div className="projects__header">
            <h2 className="projects__title">Загрузка...</h2>
          </div>
        </div>
      </section>
    )
  }

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
