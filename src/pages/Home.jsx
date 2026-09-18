import { site, about, skills, contact } from '../content'
import Icon from '../components/ui/Icon'
import './Home.css'

// the profile table: personal details first, then one row per skill group
const profileRows = [
  ...Object.entries(about.profile),
  ...skills.map(({ group, items }) => [group, items.map(({ name }) => name).join(', ')]),
]

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
        <div className="about-header">
          <span>{about.heading}</span>
          <span>Profile</span>
        </div>

        <div className="about-body">
          <div className="about-text">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {about.looking && <p>{about.looking}</p>}
            <div className="about-links">
              {contact.map(({ label, url, icon }) => (
                <a key={label} href={url} target="_blank" rel="noreferrer">
                  <Icon name={icon} /> {label}
                </a>
              ))}
            </div>
          </div>

          <dl className="about-profile">
            {profileRows.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  )
}
