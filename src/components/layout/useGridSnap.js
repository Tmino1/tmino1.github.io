import { useLayoutEffect } from 'react'

// Everything drawn with a horizontal rule, and how to put it on the dot grid.
// CSS alone can't do this, since where a rule falls depends on the text above it.
// Only the rules themselves are snapped: a box's top edge moves (by margin) if
// it has a top border, and its bottom edge (by padding) if it has a bottom one.
//   box:    both edges, and a borderless bottom edge still lands on a row so
//           the next row of a ruled list starts on one
//   top:    top edge only (whatever is below it snaps itself)
//   center: height padded so the vertical middle lands on a row
//           (for rows that draw their rule through the middle)
//   height: fixed-shape box (an image), moved and resized to whole rows
//   offset: top edge on a row by shifting it visually, for a box whose container
//           centers it, where a margin would only move it half as far
//   end:    the footer, which sits at the bottom of the screen on short pages;
//           there a margin can't move it, so it grows upward instead
const TARGETS = [
  ['.panel', 'box'],
  ['.about-header', 'box'],
  ['.about-profile > div', 'box'],
  ['.spec-sheet', 'top'],
  ['.spec-sheet-header', 'box'],
  ['.spec', 'box'],
  ['.project-specs > div', 'box'],
  ['.contact-table > div', 'box'],
  ['.project-detail-meta', 'box'],
  ['.project-detail-nav', 'top'],
  ['.timeline-milestone', 'center'],
  ['.hero-photo', 'offset'],
  ['.spec-side .project-snapshot', 'height'],
  ['.project-snapshot--placeholder', 'height'],
  ['.footer', 'end'],
]

const SELECTOR = TARGETS.map(([selector]) => selector).join(',')
const modeOf = (el) => TARGETS.find(([selector]) => el.matches(selector))[1]

// the amount (0 ≤ n < step) to add to `value` to reach the next multiple of `step`
const up = (value, step) => {
  const n = ((-value % step) + step) % step
  return n > step - 0.1 ? 0 : n // already there, give or take subpixel rounding
}
const down = (value, step) => up(-value, step)

// What this script added to an element is kept in data attributes, so each pass
// works from the element's own spacing rather than piling onto its last nudge.
function nudge(el, prop, key, extra) {
  const prev = Number(el.dataset[key] || 0)
  if (Math.abs(extra - prev) < 0.01) return false
  const base = parseFloat(getComputedStyle(el)[prop]) - prev
  el.style[prop] = `${base + extra}px`
  el.dataset[key] = extra
  return true
}

const added = (el, key) => Number(el.dataset[key] || 0)

function snap(root) {
  const grid = parseFloat(getComputedStyle(root).getPropertyValue('--grid-size'))
  if (!grid) return
  const els = root.querySelectorAll(SELECTOR)

  // Snapping one element moves everything after it, and a parent's height
  // depends on its children's, so repeat until nothing moves.
  for (let pass = 0; pass < 8; pass++) {
    let moved = false
    for (const el of els) {
      const mode = modeOf(el)
      const topOf = () => el.getBoundingClientRect().top - root.getBoundingClientRect().top

      if (mode === 'offset') {
        if (getComputedStyle(el).position === 'static') el.style.position = 'relative'
        moved = nudge(el, 'top', 'snapOffset', up(topOf() - added(el, 'snapOffset'), grid)) || moved
        continue
      }

      if (mode === 'end') {
        // a stretched page ignores the margin, and growing the footer moves its
        // top up instead, so try the margin and fall back to growing it
        const top = topOf() + added(el, 'snapPadBottom') - added(el, 'snapMargin')
        const margin = up(top, grid)
        moved = nudge(el, 'marginTop', 'snapMargin', margin) || moved
        const stuck = Math.abs(topOf() - (top - added(el, 'snapPadBottom') + margin)) > 0.5
        if (stuck) {
          moved = nudge(el, 'marginTop', 'snapMargin', 0) || moved
          moved = nudge(el, 'paddingBottom', 'snapPadBottom', down(top, grid)) || moved
        } else {
          moved = nudge(el, 'paddingBottom', 'snapPadBottom', 0) || moved
        }
        continue
      }

      const cs = getComputedStyle(el)
      if (parseFloat(cs.borderTopWidth) > 0 || mode === 'height') {
        const top = topOf() - added(el, 'snapMargin')
        moved = nudge(el, 'marginTop', 'snapMargin', up(top, grid)) || moved
      }
      if (mode === 'top') continue

      if (mode === 'height') {
        // its top is on a row, so it's resized to whole rows, +1px for a border
        const prev = el.style.height
        el.style.height = ''
        const natural = el.getBoundingClientRect().height
        const rows = Math.max(1, Math.round((natural - 1) / grid))
        el.style.height = `${rows * grid + 1}px`
        moved = el.style.height !== prev || moved
        continue
      }

      const top = topOf()
      const pad = added(el, 'snapPadTop') + added(el, 'snapPadBottom')
      const bottom = top + el.getBoundingClientRect().height - pad
      // a 1px bottom border is drawn just inside the box, so the box ending
      // 1px past a row is what centers that border on the row
      const extra =
        mode === 'center'
          ? up(top + bottom - 1, grid * 2) // the middle, (top + bottom) / 2, on a row
          : up(bottom - parseFloat(cs.borderBottomWidth), grid)
      moved = nudge(el, 'paddingTop', 'snapPadTop', extra / 2) || moved
      moved = nudge(el, 'paddingBottom', 'snapPadBottom', extra / 2) || moved
    }
    if (!moved) break
  }
}

// Keeps the ruled rows inside `rootRef` on the dot grid as the page changes.
export default function useGridSnap(rootRef, pathname) {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    snap(root)

    // re-snap whenever the content reflows (resizes, images loading in), but
    // not in response to the size change this script's own nudges cause
    let settled = root.getBoundingClientRect()
    let frame = 0
    const observer = new ResizeObserver(() => {
      const now = root.getBoundingClientRect()
      if (now.width === settled.width && now.height === settled.height) return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        snap(root)
        settled = root.getBoundingClientRect()
      })
    })
    observer.observe(root)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [rootRef, pathname])
}
