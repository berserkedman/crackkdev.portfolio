import './Button.css'

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  href,
  ...props 
}) => {
  const className = `btn btn--${variant} btn--${size}`

  if (href) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  return (
    <button className={className} {...props}>
      {children}
    </button>
  )
}
