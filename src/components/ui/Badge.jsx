import './Badge.css'

export default function Badge({ children, variant }) {
  const classes = ['badge', variant && `badge--${variant}`].filter(Boolean).join(' ')
  return <span className={classes}>{children}</span>
}
