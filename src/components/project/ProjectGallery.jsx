import { useRef, useState } from 'react'
import { ProjectSnapshot } from './ProjectMeta'
import './ProjectGallery.css'

export default function ProjectGallery({ images = [], className = '' }) {
  const trackRef = useRef(null)
  const zoomRef = useRef(null)
  const [current, setCurrent] = useState(0)
  // desktop: which image each fixed frame holds — slot 0 is the lead frame and
  // the rest are thumbnails. Focusing an image trades it with whatever is in
  // the lead, so the frames never move or resize and no image is shown twice.
  const [slots, setSlots] = useState(() => images.map((_, i) => i))

  if (images.length <= 1) {
    return <ProjectSnapshot image={images[0]} className={className} />
  }

  // the carousel is the source of truth for arrows, dots and touch swipes; it
  // is the only layout below 861px, where the tiles are hidden
  const isCarousel = () => {
    const track = trackRef.current
    return track.scrollWidth > track.clientWidth + 1
  }

  const goTo = (i) => {
    setCurrent(i)
    if (isCarousel()) {
      const track = trackRef.current
      track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' })
    }
  }

  const handleScroll = () => {
    const track = trackRef.current
    setCurrent(Math.round(track.scrollLeft / track.clientWidth))
  }

  // <dialog> earns its keep here: Esc, focus trapping and the top layer for
  // free. Clicking the backdrop — the dialog itself, outside the figure —
  // closes it the way a lightbox is expected to.
  const openZoom = () => zoomRef.current.showModal()
  const closeZoomOnBackdrop = (event) => {
    if (event.target === zoomRef.current) zoomRef.current.close()
  }

  const focusSlot = (slot) => {
    const next = [...slots]
    ;[next[0], next[slot]] = [next[slot], next[0]]
    setSlots(next)
    setCurrent(next[0])
  }

  // an odd number of thumbnails leaves a hole at the foot of the last column,
  // so the final one stretches to fill it
  const lastFillsColumn = slots.length % 2 === 0

  return (
    <div className="project-gallery-wrap">
      <div className={`project-gallery ${className}`.trim()}>
        {/* narrow screens: one full slide at a time, swiped or stepped through */}
        <div className="project-gallery-track" ref={trackRef} onScroll={handleScroll}>
          {images.map(({ src, caption }, i) => (
            <button
              key={src}
              type="button"
              className="project-gallery-slide"
              onClick={openZoom}
              aria-label={`Open image ${i + 1} of ${images.length} full screen`}
            >
              <img src={src} alt={caption || ''} loading={i === 0 ? 'eager' : 'lazy'} />
            </button>
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
          {images.map(({ src }, i) => (
            <button
              key={src}
              type="button"
              className={`project-gallery-dot${i === current ? ' is-active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Image ${i + 1} of ${images.length}`}
            />
          ))}
        </div>

        {/* desktop: a fixed lead frame beside a fixed rail of thumbnails */}
        <div className="project-gallery-tiles">
          {/* the lead holds every image stacked, with only the focused one
              opaque, so a swap cross-fades in place */}
          <button
            type="button"
            className="project-gallery-tile is-lead"
            onClick={openZoom}
            aria-label="Open the focused image full screen"
          >
            {images.map(({ src, caption }, i) => {
              const isLead = i === slots[0]
              return (
                <img
                  key={src}
                  src={src}
                  alt={isLead ? caption || '' : ''}
                  aria-hidden={isLead ? undefined : 'true'}
                  className={isLead ? 'is-visible' : ''}
                />
              )
            })}
          </button>

          {slots.slice(1).map((image, i) => {
            const slot = i + 1
            const isTall = lastFillsColumn && slot === slots.length - 1
            return (
              <button
                key={slot}
                type="button"
                className={`project-gallery-tile${isTall ? ' is-tall' : ''}`}
                onClick={() => focusSlot(slot)}
                aria-label={`Show image ${image + 1} of ${images.length}`}
              >
                <img
                  key={images[image].src}
                  src={images[image].src}
                  alt={images[image].caption || ''}
                  loading="lazy"
                />
              </button>
            )
          })}
        </div>
      </div>

      {/* only the focused image's caption is shown */}
      {images[current].caption && (
        <p className="project-gallery-caption">{images[current].caption}</p>
      )}

      <dialog ref={zoomRef} className="project-gallery-zoom" onClick={closeZoomOnBackdrop}>
        <figure>
          <img src={images[current].src} alt={images[current].caption || ''} />
          {images[current].caption && <figcaption>{images[current].caption}</figcaption>}
        </figure>
        <button
          type="button"
          className="project-gallery-zoom-close"
          onClick={() => zoomRef.current.close()}
          aria-label="Close full screen"
        >
          ✕
        </button>
      </dialog>
    </div>
  )
}
