import { site, about, skills } from '../content'
import Panel from '../components/ui/Panel'
import Badge from '../components/ui/Badge'
import './Home.css'

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div>
          <h1>{site.name}</h1>
          <p className="hero-tagline">{site.tagline}</p>
        </div>
        {site.photo ? (
          <img className="hero-photo" src={site.photo} alt={site.name} />
        ) : (
          <div className="hero-photo hero-photo--placeholder" aria-hidden="true">
            Photo
          </div>
        )}
      </section>

      <section>
        <h2>{about.heading}</h2>
        <p className="about-summary">{about.summary}</p>
        <ul className="about-highlights">
          {about.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Skills</h2>
        <div className="skills-grid">
          {skills.map(({ group, items }) => (
            <Panel key={group} hoverable>
              <h3>{group}</h3>
              <div className="skill-badges">
                {items.map(({ name, level }) => (
                  <Badge key={name} variant={level}>
                    {name}
                  </Badge>
                ))}
              </div>
            </Panel>
          ))}
        </div>
      </section>
    </div>
  )
}
