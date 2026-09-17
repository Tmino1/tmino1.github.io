import content from './content.json'

export const site = content.site
export const about = content.about
export const skills = content.skills
export const projects = content.projects
export const education = content.education
export const experience = content.experience
export const contact = content.contact

export const getProjectBySlug = (slug) =>
  projects.find((project) => project.slug === slug)
