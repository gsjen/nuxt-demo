const consola = require('consola')
const fs = require('fs').promises
const path = require('path')
const glob = require('glob')

;(async function () {
  await fs.mkdir('dist/media', { recursive: true })

  glob('!(node_modules)/**/static/**/*.png', async (er, files) => {
    if (er) {
      consola.fatal(er)
      return
    }
    for (file of files) {
      const parts = path.parse(file)
      const dirs = parts.dir.split('/').reduce((r, v, i) => {
        if (i > 0 && v !== 'static') {
          r.push(v)
        }
        return r
      }, [])

      const dir = path.join('dist/media', ...dirs)
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
