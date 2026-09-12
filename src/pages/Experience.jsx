import { experience } from '../content'
import Panel from '../components/ui/Panel'
import './Experience.css'

function formatDate(value) {
  if (value === 'Present') return value
  const [year, month] = value.split('-')
  const date = new Date(Number(year), Number(month) - 1)
  return date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' })
}

const SHAPES = ['a', 'b', 'c', 'd']

export default function Experience() {
  return (
    <div className="experience">
      <h1>Experience</h1>
      <div className="timeline">
        {experience.map(({ role, org, location, start, end, bullets }, i) => (
          <Panel
            key={`${role}-${org}`}
            hoverable
            shape={SHAPES[i % SHAPES.length]}
            className="timeline-item"
          >
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
        ))}
      </div>
    </div>
  )
}
