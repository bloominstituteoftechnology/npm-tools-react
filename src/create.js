const { exec, spawnSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const getTime = (date = new Date()) => {
  return date.toLocaleString('en-US', {
    hour12: true,
    day: '2-digit',
    month: 'long',
    weekday: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const log = (proc, name) => {
  proc.stdout.on('data', data => {
    console.log(`🍅 ${data}`)
  })
  proc.stderr.on('data', data => {
    console.error(`🍅 ${data}`)
  })
  proc.on('exit', code => {
    const emoji = code > 0 ? '❓' : '✨'
    const outcome = code > 0 ? 'failed' : 'succeeded'
    console.log(`${emoji} ${name} process ${outcome} at ${getTime()}\n`)
  })
}

const logAndKill = message => {
  console.error(message)
  console.error(`Usage:\n
    npx @ladrillo/ketchup@latest # pushes to a "lecture" branch`)
  process.exit(1)
}

module.exports = function () {
  const [, , projName = 'react-app'] = process.argv

  if (fs.existsSync(projName)) {
    console.log('Directory `' + projName + '` already exists. Aborting.')
    process.exit(1)
  }

  const sourceFolderPath = path.join(__dirname, '../react-project')
  const destinationFolderPath = path.join(process.cwd(), projName)

  const prep = () => {
    const prepProcess = exec(`
      cp -R ${sourceFolderPath} ${destinationFolderPath}
      git init
      git add -A
      git commit -m initial
    `)
    log(prepProcess, 'Prep')
  }
  prep()

  // const push = (event, path) => {
  //   console.log(`🔥 ${event} in ${path}\n`)
  //   const pushProcess = exec(`
  //     git add .
  //     git commit -m 'committing to "${branch}"'
  //     git push origin '${branch}'
  //   `)
  //   log(pushProcess, 'Commit & push')
  // }

  // if (!resume) prep()
  // const throttledPush = throttle(push, 20000, throttleConfig)
  // chokidar.watch('.', chokidarConfig).on('all', throttledPush)
}
