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
  console.error(`Docs:\n
    npx @bloomtools/react banana # creates a React project inside a "banana" folder`)
  process.exit(1)
}

module.exports = function () {
  const [, , projName = 'react-project'] = process.argv

  if (fs.existsSync(projName)) {
    logAndKill('Directory `' + projName + '` already exists')
  }

  const sourceFolderPath = path.join(__dirname, '../react-project')
  const destinationFolderPath = path.join(process.cwd(), projName)

  const start = () => {
    const projectProcess = exec(`
      cp -R ${sourceFolderPath} ${destinationFolderPath}
    `)
    log(projectProcess, 'React App')

    function testForGit() {
      let test
      try {
        test = exec('git rev-parse --is-inside-work-tree', { encoding: 'utf8' })
      } catch { }
      return !!test
    }

    if (!testForGit()) {
      const gitProcess = exec(`
      cd destinationFolderPath
      git init
      git add -A
      git commit -m initial
    `)
      log(gitProcess, 'Git Repo')
    }
  }
  start()
}
