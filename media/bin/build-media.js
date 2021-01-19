const consola = require('consola')
const fs = require('fs').promises
const path = require('path')
const glob = require('glob')

;(async function () {
  try {
    await fs.access('dist')
  } catch {
    await fs.mkdir('dist')
  }

  process.chdir('..')
  glob('content/*/media/**/*.@(png|jpg|jpeg|pdf)', async (er, files) => {
    if (er) {
      consola.fatal(er)
      return
    }
    for (file of files) {
      const parts = path.parse(file)
      const dirs = parts.dir.split('/')
      const dest = dirs.reduce((r, v, i) => {
        if (i !== 0 && i !== 2) {
          if (!(i === 1 && v === '$shared')) {
            r.push(v)
          }
        }
        return r
      }, [])

      const dir = path.join('media/dist', ...dest)
      await fs.mkdir(dir, { recursive: true })

      try {
        await fs.copyFile(file, path.join(dir, parts.base))
      } catch (error) {
        consola.fatal(error)
        return
      }
    }
  })
})()
