import Icon from './Icon'
import './IconLink.css'

export default function IconLink({ href, icon, children }) {
  const external = href.startsWith('http')
  return (
    <a
      className="icon-link"
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
    >
      <Icon name={icon} />
      <span>{children}</span>
    </a>
  )
}
