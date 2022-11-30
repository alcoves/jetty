import fs from 'fs-extra'
import chokidar from 'chokidar'
import addFile from './addFile'
import { Config } from './types'

export default async function main() {
  const config = (await fs.readJSON('./jetty.json')) as Config
  if (!config) throw new Error('./jetty.json does not exist!')

  config.rules.map(rule => {
    const watcher = chokidar.watch(rule.watchDir, {
      // eslint-disable-next-line
      ignored: /(^|[\/\\])\../, // ignore dotfiles
      persistent: true,
      usePolling: true,
      awaitWriteFinish: {
        pollInterval: 250,
        stabilityThreshold: 4000,
      },
    })

    watcher.on('add', path => {
      addFile(path, rule)
    })
    // watcher.on('change', path => {
    //   addFile(path, rule)
    // })
  })

  // .on('unlink', path => {
  //   console.log(`File ${path} has been removed`)
  // })

  //   function render() {
  //     console.clear()
  //     console.log(
  //       `
  // ${chalk.bold.yellow('Jetty')}

  // Watch Dirs:
  // ${watchDirs.map(dir => `${dir}\n`)}
  //   `
  //     )
  //   }

  //   setInterval(render, 1000)

  setInterval(() => {
    // console.log('interval')
  }, 1000)
}

main()
