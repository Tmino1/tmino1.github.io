import photos from 'virtual:project-photos'
import content from './content.json'

export const site = content.site
export const about = content.about
export const skills = content.skills
// projects are listed by their `order` number (lowest first); ones without
// a number go last, and ties keep their position in content.json.
// an explicit `images` list in content.json wins (to control photo order);
// otherwise use whatever is in public/projects/<slug>/
export const projects = content.projects
  .toSorted((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))
  .map((project) => ({
    ...project,
    images: project.images ?? photos[project.slug] ?? [],
  }))
export const education = content.education
export const experience = content.experience
export const contact = content.contact

export const getProjectBySlug = (slug) =>
  projects.find((project) => project.slug === slug)
