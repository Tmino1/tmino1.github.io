import Icon from '../ui/Icon'
import './ProjectMeta.css'

export function ProjectId({ index }) {
  return <span className="project-id">P-{String(index + 1).padStart(2, '0')}</span>
}

// `status` in content.json must be one of these keys; the color comes from
// the matching .project-status--<key> rule in ProjectMeta.css
const PROJECT_STATUSES = {
  active: 'Active',
  'in-development': 'In Development',
  prototype: 'Prototype',
  research: 'Research',
  testing: 'Testing',
  'public-alpha': 'Public Alpha',
  deployed: 'Deployed',
  maintained: 'Maintained',
  complete: 'Complete',
  paused: 'Paused',
  planned: 'Planned',
  archived: 'Archived',
}

export function ProjectStatus({ status }) {
  return (
    <div className={`project-status project-status--${status}`}>
      {PROJECT_STATUSES[status] ?? status}
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

export function ProjectLinks({ links = {} }) {
  const { github, live } = links
  if (!github && !live) return null
  return (
    <div className="project-links">
      {github && (
        <a href={github} target="_blank" rel="noreferrer">
          <Icon name="github" /> GitHub
        </a>
      )}
      {live && (
        <a href={live} target="_blank" rel="noreferrer">
          <Icon name="external-link" /> Live
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
