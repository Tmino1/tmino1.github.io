import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import TopBar from './TopBar'
import Footer from './Footer'
import './Shell.css'

export default function Shell({ children }) {
  const { pathname } = useLocation()
  const shellRef = useRef(null)

  // the shell is the scroll container, so reset it ourselves on navigation
  useEffect(() => {
    shellRef.current?.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="shell" ref={shellRef}>
      <div className="shell-glow" aria-hidden="true" />
      <div className="shell-content">
        <TopBar />
        <main className="shell-main">{children}</main>
        <Footer />
      </div>
    </div>
  )
}
