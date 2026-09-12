import { projects } from '../content'
import Panel from '../components/ui/Panel'
import Badge from '../components/ui/Badge'
import Icon from '../components/ui/Icon'
import './Projects.css'

export default function Projects() {
  return (
    <div className="projects">
      <h1>Projects</h1>
      <div className="projects-grid">
        {projects.map(({ slug, name, description, tags, image, links, featured }) => (
          <Panel key={slug} hoverable featured={featured} className="project-card">
            <img className="project-image" src={image} alt="" loading="lazy" />
            <h2>{name}</h2>
            <p>{description}</p>
            <div className="project-tags">
              {tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <div className="project-links">
              {links.live && (
                <a href={links.live} target="_blank" rel="noreferrer" className="project-link">
                  <Icon name="external-link" /> Live
                </a>
              )}
              {links.source && (
                <a href={links.source} target="_blank" rel="noreferrer" className="project-link">
                  <Icon name="github" /> Source
                </a>
              )}
            </div>
          </Panel>
        ))}
      </div>
    </div>
  )
}
