const { execSync } = require('child_process')
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

const logAndKill = message => {
  console.error(message)
  console.error(`Docs:
    npx @bloomtools/react todos # replace "todos" with desired project name
    npx @bloomtools/react@0.0.3 todos # to use a specific version of this tool
    npx @bloomtools/react # a default project name "react-project" is used
  `)
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
    execSync(`
      cp -R ${sourceFolderPath} ${destinationFolderPath}
    `)
    console.log(`✨ Project ${projName} created on ${getTime()}`)

    try {
      execSync('git rev-parse --is-inside-work-tree 2>/dev/null', { encoding: 'utf8' })
    } catch {
      execSync(`
        cd ${destinationFolderPath}
        git init
        git add -A
        git commit -m "initial commit"
      `)
      console.log(`✨ Initialized a Git repo, since this folder isn't one`)
    }
    console.log(`✨ START CODING:
      1- cd into the ${projName} folder
      2- execute "npm install"
      3- execute "npm run dev"
      4- see the app loading in "http://localhost:3003"
    `)
  }
  try {
    start()
  } catch (e) {
    logAndKill(`An error happened: ${e.message}`)
  }
}
