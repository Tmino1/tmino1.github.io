import { Link } from 'react-router-dom'
import { projects } from '../content'
import {
  ProjectId,
  ProjectLinks,
  ProjectSnapshot,
  ProjectSpecs,
  ProjectStatus,
} from '../components/project/ProjectMeta'
import './Projects.css'

export default function Projects() {
  return (
    <div className="projects">
      <h1>Projects</h1>
      <div className="spec-sheet">
        <div className="spec-sheet-header">
          <span>Index / Project</span>
          <span>Specs</span>
        </div>
        {projects.map(({ slug, name, description, tags, image, links, status, dates, specs }, i) => (
          <article key={slug} className="spec">
            <ProjectId index={i} />

            <div className="spec-body">
              <h2>
                <Link to={`/projects/${slug}`} className="spec-link">
                  {name}
                  <span className="spec-arrow" aria-hidden="true"> →</span>
                </Link>
              </h2>
              <ProjectStatus status={status} />
              <p>{description}</p>
              <ProjectLinks links={links} />
            </div>

            <div className="spec-side">
              <ProjectSnapshot image={image} />
              <ProjectSpecs specs={specs} tags={tags} dates={dates} />
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
