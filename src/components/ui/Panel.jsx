import './Panel.css'

export default function Panel({
  as: Tag = 'div',
  hoverable = false,
  featured = false,
  shape,
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'panel',
    hoverable && 'panel--hoverable',
    featured && 'panel--featured',
    shape && `panel--shape-${shape}`,
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
