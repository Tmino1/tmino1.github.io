import { site, contact } from '../content'
import Panel from '../components/ui/Panel'
import IconLink from '../components/ui/IconLink'
import './Contact.css'

export default function Contact() {
  return (
    <div className="contact">
      <h1>Contact</h1>
      <Panel shape="e" className="contact-panel">
        <p>
          Based in {site.location}. Reach out below — happy to talk about work,
          projects, or anything interesting you're building.
        </p>
        <div className="contact-links">
          {contact.map(({ label, url, icon }) => (
            <IconLink key={label} href={url} icon={icon}>
              {label}
            </IconLink>
          ))}
        </div>
      </Panel>
    </div>
  )
}
