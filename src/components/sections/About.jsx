import './About.css'

export const About = () => {
  return (
    <section id="about" className="about">
      <div className="about__container">
        <h2 className="about__title">Обо мне</h2>
        <div className="about__content">
          <p>
            Более 3 лет разрабатываю решения на Python для автоматизации бизнес-процессов.
            Специализируюсь на создании Telegram-ботов, парсинге данных и интеграции систем.
          </p>
          <p>
            Работаю с проектами любой сложности — от простых ботов-визиток
            до сложных систем с базами данных, платёжными системами и внешними API.
          </p>
        </div>
      </div>
    </section>
  )
}
