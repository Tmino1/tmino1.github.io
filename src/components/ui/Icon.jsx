export default function Icon({ name, className = '' }) {
  return (
    <svg className={`icon ${className}`.trim()} aria-hidden="true">
      <use href={`/icons.svg#${name}-icon`} />
    </svg>
  )
}
