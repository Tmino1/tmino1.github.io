import { education, experience } from '../content'
import Panel from '../components/ui/Panel'
import './Experience.css'

function formatDate(value) {
  if (value === 'Present') return value
  const [year, month] = value.split('-')
  const date = new Date(Number(year), Number(month) - 1)
  return date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' })
}

function Milestone({ date, label, detail }) {
  return (
    <div className="timeline-milestone">
      <span className="timeline-dates">{formatDate(date)}</span>
      <span className="timeline-milestone-label">
        {label}
        <span className="timeline-milestone-detail"> · {detail}</span>
      </span>
    </div>
  )
}

export default function Experience() {
  const { degree, minors, school, start, end, next } = education

  return (
    <div className="experience">
      <h1>Experience</h1>
      <div className="timeline">
        {next && (
          <Milestone date={next.start} label={`Continuing into — ${next.degree}`} detail={next.school} />
        )}
        <Milestone date={end} label={`Graduating — ${degree}`} detail={`${minors}, ${school}`} />
        {experience.map(({ role, org, location, start, end, bullets }) => (
          <div key={`${role}-${org}`} className="timeline-item">
            <Panel hoverable>
              <div className="timeline-header">
                <h2>{role}</h2>
                <span className="timeline-dates">
                  {formatDate(start)} – {formatDate(end)}
                </span>
              </div>
              <p className="timeline-org">
                {org} · {location}
              </p>
              <ul className="timeline-bullets">
                {bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </Panel>
          </div>
        ))}
        <Milestone date={start} label={`Started — ${degree}`} detail={school} />
      </div>
    </div>
  )
}
