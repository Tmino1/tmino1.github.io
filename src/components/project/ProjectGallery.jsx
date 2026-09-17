import { useRef, useState } from 'react'
import { ProjectSnapshot } from './ProjectMeta'
import './ProjectGallery.css'

export default function ProjectGallery({ images = [], className = '' }) {
  const trackRef = useRef(null)
  const [current, setCurrent] = useState(0)

  if (images.length <= 1) {
    return <ProjectSnapshot image={images[0]} className={className} />
  }

  const goTo = (i) => {
    const track = trackRef.current
    track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' })
  }

  // on desktop the track is a static tile grid; on narrower screens it's a
  // scroll-snapping carousel, so the scroll position is the source of truth
  // for arrow clicks, dots and touch swipes alike
  const handleScroll = () => {
    const track = trackRef.current
    setCurrent(Math.round(track.scrollLeft / track.clientWidth))
  }

  return (
    <div className={`project-gallery ${className}`.trim()}>
      <div className="project-gallery-track" ref={trackRef} onScroll={handleScroll}>
        {images.map((src, i) => (
          <img
            key={src}
            className="project-gallery-slide"
            src={src}
            alt=""
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}
      </div>

      <button
        type="button"
        className="project-gallery-arrow project-gallery-arrow--prev"
        onClick={() => goTo(current - 1)}
        disabled={current === 0}
        aria-label="Previous image"
      >
        ←
      </button>
      <button
        type="button"
        className="project-gallery-arrow project-gallery-arrow--next"
        onClick={() => goTo(current + 1)}
        disabled={current === images.length - 1}
        aria-label="Next image"
      >
        →
      </button>

      <div className="project-gallery-dots">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            className={`project-gallery-dot${i === current ? ' is-active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Image ${i + 1} of ${images.length}`}
          />
        ))}
      </div>
    </div>
  )
}
