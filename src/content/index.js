import photos from 'virtual:project-photos'
import content from './content.json'

export const site = content.site
export const about = content.about
export const skills = content.skills
// an explicit `images` list in content.json wins (to control photo order);
// otherwise use whatever is in public/projects/<slug>/. `captions` is keyed by
// file name, so a caption survives the photo being reordered or renamed.
const withImages = (project) => {
  const sources = project.images ?? photos[project.slug] ?? []
  const captions = project.captions ?? {}
  return sources.map((src) => ({
    src,
    caption: captions[src.slice(src.lastIndexOf('/') + 1)] ?? '',
  }))
}

// projects are listed by their `order` number (lowest first); ones without
// a number go last, and ties keep their position in content.json.
export const projects = content.projects
  .toSorted((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))
  .map((project) => ({
    ...project,
    images: withImages(project),
  }))
export const education = content.education
export const experience = content.experience
export const contact = content.contact

export const getProjectBySlug = (slug) =>
  projects.find((project) => project.slug === slug)
