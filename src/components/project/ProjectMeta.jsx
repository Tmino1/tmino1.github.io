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
  if (!image) {
    return (
      <div className={`project-snapshot project-snapshot--placeholder ${className}`.trim()}>
        Snapshot
      </div>
    )
  }

  return (
    <figure className="project-figure">
      <img
        className={`project-snapshot ${className}`.trim()}
        src={image.src}
        alt={image.caption || ''}
        loading="lazy"
      />
      {image.caption && <figcaption>{image.caption}</figcaption>}
    </figure>
  )
}

// a link is a bare url, or { href, label } when the default wording is wrong
// for it — a docs site, say, or a page for an earlier revision
const resolveLink = (link, label) =>
  typeof link === 'string' ? { href: link, label } : { label, ...link }

export function ProjectLinks({ links = {} }) {
  const github = resolveLink(links.github, 'GitHub')
  const live = resolveLink(links.live, 'Live')
  if (!github.href && !live.href) return null
  return (
    <div className="project-links">
      {github.href && (
        <a href={github.href} target="_blank" rel="noreferrer">
          <Icon name="github" /> {github.label}
        </a>
      )}
      {live.href && (
        <a href={live.href} target="_blank" rel="noreferrer">
          <Icon name="external-link" /> {live.label}
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
