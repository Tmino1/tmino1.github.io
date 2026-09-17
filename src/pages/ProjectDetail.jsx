import { Link, useParams } from 'react-router-dom'
import { projects } from '../content'
import {
  ProjectId,
  ProjectLinks,
  ProjectSnapshot,
  ProjectSpecs,
  ProjectStatus,
} from '../components/project/ProjectMeta'
import NotFound from './NotFound'
import './ProjectDetail.css'

export default function ProjectDetail() {
  const { slug } = useParams()
  const index = projects.findIndex((project) => project.slug === slug)
  if (index === -1) return <NotFound />

  const { name, description, tags, image, links, status, dates, specs } = projects[index]
  const prev = projects[index - 1]
  const next = projects[index + 1]

  return (
    <article className="project-detail">
      <Link to="/projects" className="project-detail-back">
        ← All projects
      </Link>

      <header className="project-detail-header">
        <ProjectId index={index} />
        <h1>{name}</h1>
        <ProjectStatus status={status} />
      </header>

      <ProjectSnapshot image={image} className="project-detail-snapshot" />

      <div className="project-detail-body">
        <div className="project-detail-text">
          <p>{description}</p>
          <ProjectLinks links={links} />
        </div>
        <ProjectSpecs specs={specs} tags={tags} dates={dates} />
      </div>

      <nav className="project-detail-nav">
        {prev ? (
          <Link to={`/projects/${prev.slug}`}>← {prev.name}</Link>
        ) : (
          <span />
        )}
        {next && <Link to={`/projects/${next.slug}`}>{next.name} →</Link>}
      </nav>
    </article>
  )
}
