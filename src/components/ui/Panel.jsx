import './Panel.css'

export default function Panel({
  as: Tag = 'div',
  hoverable = false,
  featured = false,
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'panel',
    hoverable && 'panel--hoverable',
    featured && 'panel--featured',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  )
}
