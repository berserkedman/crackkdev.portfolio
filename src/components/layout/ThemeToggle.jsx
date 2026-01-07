import { useTheme } from '../../hooks/useTheme'
import './ThemeToggle.css'

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button 
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="Переключить тему"
    >
      {theme === 'light' ? (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 3V1M10 19V17M17 10H19M1 10H3M15.657 4.343L17.071 2.929M2.929 17.071L4.343 15.657M15.657 15.657L17.071 17.071M2.929 2.929L4.343 4.343M14 10C14 12.2091 12.2091 14 10 14C7.79086 14 6 12.2091 6 10C6 7.79086 7.79086 6 10 6C12.2091 6 14 7.79086 14 10Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M17 10.5C16.8 14.7 13.3 18 9 18C4.6 18 1 14.4 1 10C1 5.7 4.3 2.2 8.5 2C8.2 2.6 8 3.3 8 4C8 6.8 10.2 9 13 9C13.7 9 14.4 8.8 15 8.5C16.4 9.2 17.2 9.7 17 10.5Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  )
}
