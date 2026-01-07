import './Card.css'

export const Card = ({ children, hover = false, ...props }) => {
  return (
    <div className={`card ${hover ? 'card--hover' : ''}`} {...props}>
      {children}
    </div>
  )
}
