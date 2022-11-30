import path from 'path'
import fs from 'fs-extra'
import { ffmpeg } from './ffmpeg'
import { Rule } from './types'

export default async function addFile(filepath: string, rule: Rule) {
  const basename = path.basename(filepath)
  const lockFileName = `.${basename}.jettylock`
  const lockFilePath = filepath.replace(`/${basename}`, `/${lockFileName}`)

  try {
    if (await fs.pathExists(lockFilePath)) {
      console.debug('lock already exists')
      return
    }

    console.debug('creating a lock file')
    await fs.writeFile(lockFilePath, 'locked')

    console.debug('make sure output directory exists')
    await fs.ensureDir('/mnt/houston/shack/jetty/output')

    for (const step of rule.steps) {
      console.debug('running command')
      const outputFilename = `${rule.outputDir}/${path.parse(basename).name}.${step.container}`
      await ffmpeg(`-y -i ${filepath} ${step.command} ${outputFilename}`)
    }
  } catch (error) {
    console.error('Error', error)
  } finally {
    // await fs.remove(lockFilePath)
  }
}
