import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import './ProjectDetail.css'

export const ProjectDetail = () => {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProject = async () => {
      try {
        const res = await fetch('/data/projects.json')
        if (res.ok) {
          const data = await res.json()
          const found = data.projects.find(p => p.slug === slug)
          
          if (found) {
            setProject(found)
            setNotFound(false)
          } else {
            setNotFound(true)
          }
        } else {
          setNotFound(true)
        }
      } catch (error) {
        console.error('Ошибка загрузки проекта:', error)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    loadProject()
  }, [slug])

  // Пока проект загружается
  if (loading) {
    return (
      <div className="project-detail">
        <div className="project-detail__container">
          <Link to="/" className="project-detail__back">
            ← Назад на главную
          </Link>
          <p style={{ color: 'var(--color-text-secondary)' }}>Загрузка...</p>
        </div>
      </div>
    )
  }

  // Если проект не найден
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
          <p style={{ whiteSpace: 'pre-line' }}>{project.fullDescription}</p>
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
