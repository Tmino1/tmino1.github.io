import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>
        That page doesn't exist. <Link to="/">Go home</Link>.
      </p>
    </div>
  )
}
