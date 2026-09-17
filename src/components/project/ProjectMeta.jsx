import Icon from '../ui/Icon'
import './ProjectMeta.css'

export function ProjectId({ index }) {
  return <span className="project-id">P-{String(index + 1).padStart(2, '0')}</span>
}

export function ProjectStatus({ status }) {
  return (
    <div className={`project-status project-status--${status}`}>
      {status === 'active' ? 'Active' : 'Complete'}
    </div>
  )
}

export function ProjectSnapshot({ image, className = '' }) {
  return image ? (
    <img className={`project-snapshot ${className}`.trim()} src={image} alt="" loading="lazy" />
  ) : (
    <div className={`project-snapshot project-snapshot--placeholder ${className}`.trim()}>
      Snapshot
    </div>
  )
}

export function ProjectLinks({ links }) {
  if (!links.live && !links.source) return null
  return (
    <div className="project-links">
      {links.live && (
        <a href={links.live} target="_blank" rel="noreferrer">
          <Icon name="external-link" /> Live
        </a>
      )}
      {links.source && (
        <a href={links.source} target="_blank" rel="noreferrer">
          <Icon name="github" /> Source
        </a>
      )}
    </div>
  )
}

export function ProjectSpecs({ specs, tags, dates }) {
  const rows = [...Object.entries(specs), ['Stack', tags.join(', ')], ['Dates', dates]]
  return (
    <dl className="project-specs">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  )
}
