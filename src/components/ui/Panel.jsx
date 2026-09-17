import './Panel.css'

export default function Panel({
  as: Tag = 'div',
  hoverable = false,
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'panel',
    hoverable && 'panel--hoverable',
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
