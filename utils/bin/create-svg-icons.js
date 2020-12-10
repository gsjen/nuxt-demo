const consola = require('consola')
const fs = require('fs').promises
const path = require('path')
const svgo = require('svgo')
const parseString = require('xml2js').parseStringPromise
const util = require('util')
const camelCase = require('lodash').camelCase
const upperFirst = require('lodash').upperFirst

;(async function () {
  const optimizer = new svgo({
    plugins: [{ removeDimensions: true }],
  })
  const { argv } = process

  const input = argv[2]
  if (!input) {
    consola.error('Please specify an input path.')
    return
  }
  const outputPath = argv[3]
  if (!outputPath) {
    consola.fatal('Please specify an ouput path.')
    return
  }

  const prefix = argv[4] || ''

  try {
    const files = await fs.readdir(input)

    if (files.length === 0) {
      throw new Error('Input path empty.')
    }

    const output = await fs.open(outputPath, 'w')

    for (const file of files) {
      let xml = await fs.readFile(path.join(input, file))

      xml = await optimizer.optimize(xml)

      const result = await parseString(xml.data, {
        mergeAttrs: true,
        explicitArray: false,
      })

      result.svg.name = camelCase(
        file.slice(file.indexOf('-') + 1, file.lastIndexOf('.'))
      )

      await output.write(
        `export const ${prefix + upperFirst(result.svg.name)} = ${util.inspect(
          result.svg,
          false,
          null
        )};\n`
      )
    }

    await output.close()

    consola.success(`${outputPath} created.`)
  } catch (error) {
    consola.fatal(error)
  }
})()
