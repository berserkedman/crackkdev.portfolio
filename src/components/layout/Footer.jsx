import './Footer.css'

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__info">
            <h3 className="footer__name">Тимур</h3>
            <p className="footer__description">
              Python-разработчик • Автоматизация & Telegram-боты
            </p>
          </div>

          <div className="footer__links">
            <a href="https://t.me/neffixlab" target="_blank" rel="noopener noreferrer">
              Telegram
            </a>
            <a href="https://kwork.ru/user/neffixlab" target="_blank" rel="noopener noreferrer">
              Kwork
            </a>
            <a href="https://t.me/neffixlab_reviews" target="_blank" rel="noopener noreferrer">
              Отзывы
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2025 Все права защищены</p>
        </div>
      </div>
    </footer>
  )
}
