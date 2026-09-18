import { useState } from 'react'
import { site, about, contact } from '../content'
import Icon from '../components/ui/Icon'
import IconLink from '../components/ui/IconLink'
import './Contact.css'

// show the address, not the scheme: mailto:me@x.com reads as me@x.com
const display = (url) => url.replace(/^mailto:/, '').replace(/^https?:\/\//, '')

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard blocked (insecure context, or permission denied): the mailto
      // link next to the button still works
    }
  }

  return (
    <div className="contact">
      <h1>Contact</h1>

      <p className="contact-status">{site.status}</p>
      <p className="contact-lead">{about.looking}</p>

      {/* the projects page spec sheet, applied to a person */}
      <dl className="contact-table">
        {contact.map(({ label, url, icon }) => {
          const external = url.startsWith('http')
          return (
            <div key={label}>
              <dt>{label}</dt>
              <dd>
                <a
                  href={url}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                >
                  <Icon name={icon} /> {display(url)}
                </a>
                {label === 'Email' && (
                  <button type="button" className="contact-copy" onClick={copyEmail}>
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                )}
              </dd>
            </div>
          )
        })}
        <div>
          <dt>Based in</dt>
          <dd>{site.location}</dd>
        </div>
      </dl>

      {/* only rendered once a résumé is actually in public/ */}
      {site.resume && (
        <div className="contact-actions">
          <IconLink href={site.resume} icon="documentation">
            Résumé (PDF)
          </IconLink>
        </div>
      )}
    </div>
  )
}
