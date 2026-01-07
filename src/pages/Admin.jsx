import { useState, useEffect } from 'react'
import './Admin.css'

const DEFAULT_PASSWORD = 'admin2026'

export const Admin = () => {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Загрузка данных
  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      const res = await fetch('/data/projects.json')
      const data = await res.json()
      setContent(data)
    } catch (error) {
      console.error('Ошибка загрузки:', error)
      alert('❌ Не удалось загрузить данные')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === DEFAULT_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem('adminAuth', 'true')
    } else {
      alert('❌ Неверный пароль')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('adminAuth')
    setPassword('')
  }

  const handleSave = async () => {
    if (!password) {
      alert('❌ Введите пароль для сохранения')
      return
    }

    setSaving(true)
    try {
      const res = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, content })
      })

      if (!res.ok) {
        throw new Error('Ошибка сохранения')
      }

      alert('✅ Изменения сохранены! Vercel автоматически обновит сайт через 1-2 минуты.')
    } catch (error) {
      console.error('Ошибка:', error)
      alert('❌ Не удалось сохранить изменения')
    } finally {
      setSaving(false)
    }
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

  const updateTech = (projectIndex, techIndex, value) => {
    setContent(prev => ({
      ...prev,
      projects: prev.projects.map((p, i) => 
        i === projectIndex 
          ? { ...p, tech: p.tech.map((t, ti) => ti === techIndex ? value : t) }
          : p
      )
    }))
  }

  const addTech = (projectIndex) => {
    setContent(prev => ({
      ...prev,
      projects: prev.projects.map((p, i) => 
        i === projectIndex ? { ...p, tech: [...p.tech, 'Новая технология'] } : p
      )
    }))
  }

  const removeTech = (projectIndex, techIndex) => {
    setContent(prev => ({
      ...prev,
      projects: prev.projects.map((p, i) => 
        i === projectIndex 
          ? { ...p, tech: p.tech.filter((_, ti) => ti !== techIndex) }
          : p
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
        category: 'НОВАЯ КАТЕГОРИЯ',
        title: 'Новый проект',
        description: 'Краткое описание',
        fullDescription: 'Полное описание проекта',
        tech: ['Python'],
        images: [],
        link: ''
      }]
    }))
  }

  const deleteProject = (index) => {
    if (confirm('❌ Точно удалить проект?')) {
      setContent(prev => ({
        ...prev,
        projects: prev.projects.filter((_, i) => i !== index)
      }))
    }
  }

  // Экран входа
  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <form className="admin-login__form" onSubmit={handleLogin}>
          <h1>🔐 Админ-панель</h1>
          <p className="admin-login__description">
            Введите пароль для доступа
          </p>
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          <button type="submit">Войти</button>
        </form>
      </div>
    )
  }

  if (loading || !content) {
    return (
      <div className="admin-login">
        <div className="admin-login__form">
          <h1>⏳ Загрузка...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="admin">
      {/* Шапка */}
      <header className="admin__header">
        <h1>⚙️ Админ-панель</h1>
        <div className="admin__actions">
          <button 
            className="admin__btn admin__btn--primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? '⏳ Сохранение...' : '💾 Сохранить изменения'}
          </button>
          <button 
            className="admin__btn admin__btn--secondary"
            onClick={loadContent}
          >
            🔄 Обновить
          </button>
          <button 
            className="admin__btn admin__btn--ghost"
            onClick={handleLogout}
          >
            🚪 Выйти
          </button>
        </div>
      </header>

      <div className="admin__content">
        {/* Блок Hero */}
        <section className="admin__section">
          <h2>👤 Главная секция</h2>
          
          <div className="admin__field">
            <label>Заголовок</label>
            <input
              value={content.hero.title}
              onChange={(e) => updateHero('title', e.target.value)}
              placeholder="Имя и возраст"
            />
          </div>

          <div className="admin__field">
            <label>Подзаголовок</label>
            <input
              value={content.hero.subtitle}
              onChange={(e) => updateHero('subtitle', e.target.value)}
              placeholder="Должность"
            />
          </div>

          <div className="admin__field">
            <label>Тэглайн</label>
            <input
              value={content.hero.tagline}
              onChange={(e) => updateHero('tagline', e.target.value)}
              placeholder="Специализация"
            />
          </div>

          <div className="admin__field">
            <label>Описание</label>
            <textarea
              value={content.hero.description}
              onChange={(e) => updateHero('description', e.target.value)}
              rows={3}
              placeholder="Подробное описание"
            />
          </div>
        </section>

        {/* Блок проектов */}
        <section className="admin__section">
          <div className="admin__section-header">
            <h2>📂 Проекты ({content.projects.length})</h2>
            <button 
              className="admin__btn admin__btn--primary"
              onClick={addProject}
            >
              ➕ Добавить проект
            </button>
          </div>

          {content.projects.map((project, index) => (
            <div key={project.id} className="admin__project">
              <div className="admin__project-header">
                <h3>Проект #{index + 1}</h3>
                <button 
                  className="admin__btn admin__btn--danger"
                  onClick={() => deleteProject(index)}
                >
                  🗑 Удалить
                </button>
              </div>

              <div className="admin__row">
                <div className="admin__field">
                  <label>Категория</label>
                  <input
                    value={project.category}
                    onChange={(e) => updateProject(index, 'category', e.target.value)}
                    placeholder="TELEGRAM-БОТЫ"
                  />
                </div>

                <div className="admin__field">
                  <label>Slug (URL)</label>
                  <input
                    value={project.slug}
                    onChange={(e) => updateProject(index, 'slug', e.target.value)}
                    placeholder="project-name"
                  />
                  <small>Используется в URL: /projects/{project.slug}</small>
                </div>
              </div>

              <div className="admin__field">
                <label>Название проекта</label>
                <input
                  value={project.title}
                  onChange={(e) => updateProject(index, 'title', e.target.value)}
                  placeholder="Название"
                />
              </div>

              <div className="admin__field">
                <label>Краткое описание</label>
                <textarea
                  value={project.description}
                  onChange={(e) => updateProject(index, 'description', e.target.value)}
                  rows={2}
                  placeholder="Для карточки проекта"
                />
              </div>

              <div className="admin__field">
                <label>Полное описание</label>
                <textarea
                  value={project.fullDescription}
                  onChange={(e) => updateProject(index, 'fullDescription', e.target.value)}
                  rows={3}
                  placeholder="Для страницы проекта"
                />
              </div>

              <div className="admin__field">
                <label>Ссылка на проект</label>
                <input
                  value={project.link}
                  onChange={(e) => updateProject(index, 'link', e.target.value)}
                  placeholder="https://"
                />
              </div>

              <div className="admin__field">
                <label>Технологии</label>
                {project.tech.map((tech, techIndex) => (
                  <div key={techIndex} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <input
                      value={tech}
                      onChange={(e) => updateTech(index, techIndex, e.target.value)}
                      placeholder="Технология"
                      style={{ flex: 1 }}
                    />
                    <button
                      className="admin__btn admin__btn--danger"
                      onClick={() => removeTech(index, techIndex)}
                      type="button"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  className="admin__btn admin__btn--secondary"
                  onClick={() => addTech(index)}
                  type="button"
                  style={{ marginTop: '8px' }}
                >
                  ➕ Добавить технологию
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
