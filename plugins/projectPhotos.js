import fs from 'node:fs'
import path from 'node:path'

// Keeps a public/projects/<slug>/ photo folder for every project in
// content.json and exposes each folder's images as `virtual:project-photos`.
// Folders are created on dev start / build and whenever content.json changes;
// dropping photos into a folder shows them on the site without editing JSON.

const VIRTUAL_ID = 'virtual:project-photos'
const RESOLVED_ID = '\0' + VIRTUAL_ID
const IMAGE_EXT = /\.(jpe?g|png|gif|webp|avif|svg)$/i

export default function projectPhotos() {
  let contentFile
  let photosDir

  const readSlugs = () => {
    const { projects = [] } = JSON.parse(fs.readFileSync(contentFile, 'utf8'))
    return projects.map((project) => project.slug).filter(Boolean)
  }

  // never deletes anything, so photos for a removed project are left alone
  const ensureFolders = () => {
    for (const slug of readSlugs()) {
      const dir = path.join(photosDir, slug)
      if (fs.existsSync(dir)) continue
      fs.mkdirSync(dir, { recursive: true })
      // git doesn't track empty folders
      fs.writeFileSync(path.join(dir, '.gitkeep'), '')
    }
  }

  const collectPhotos = () =>
    Object.fromEntries(
      readSlugs().map((slug) => {
        const dir = path.join(photosDir, slug)
        const files = fs.existsSync(dir)
          ? fs
              .readdirSync(dir)
              .filter((file) => IMAGE_EXT.test(file))
              .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
          : []
        return [slug, files.map((file) => `/projects/${slug}/${file}`)]
      }),
    )

  return {
    name: 'project-photos',

    configResolved(config) {
      contentFile = path.resolve(config.root, 'src/content/content.json')
      photosDir = path.resolve(config.publicDir, 'projects')
      ensureFolders()
    },

    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
    },

    load(id) {
      if (id === RESOLVED_ID) {
        return `export default ${JSON.stringify(collectPhotos())}`
      }
    },

    configureServer(server) {
      const refresh = (file) => {
        const isContent = file === contentFile
        const isPhoto = file.startsWith(photosDir + path.sep) && IMAGE_EXT.test(file)
        if (!isContent && !isPhoto) return

        if (isContent) ensureFolders()
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID)
        if (mod) server.moduleGraph.invalidateModule(mod)
        server.ws.send({ type: 'full-reload' })
      }

      server.watcher.add(photosDir)
      server.watcher.on('add', refresh)
      server.watcher.on('unlink', refresh)
      server.watcher.on('change', refresh)
    },
  }
}
