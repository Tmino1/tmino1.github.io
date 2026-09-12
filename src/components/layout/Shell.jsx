import TopBar from './TopBar'
import Footer from './Footer'
import './Shell.css'

export default function Shell({ children }) {
  return (
    <div className="shell">
      <div className="shell-glow" aria-hidden="true" />
      <div className="shell-content">
        <TopBar />
        <main className="shell-main">{children}</main>
        <Footer />
      </div>
    </div>
  )
}
