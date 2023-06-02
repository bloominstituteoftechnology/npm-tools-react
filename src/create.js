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
    execSync(`
      cp -R ${sourceFolderPath} ${destinationFolderPath}
    `)
    console.log(`✨ Project ${projName} created at ${getTime()}!`)

    try {
      execSync('git rev-parse --is-inside-work-tree', { encoding: 'utf8' })
    } catch {
      execSync(`
        cd destinationFolderPath
        git init
        git add -A
        git commit -m "initial commit"
      `)
      console.log(`✨ Initialized Git repo!`)
    }
    console.log(`✨ START CODING:
      1- cd into your ${projName} folder
      2- execute "npm install"
      3- execute "npm run dev"
      4- see your app loading in "http://localhost:3003"
    `)
  }
  try {
    start()
  } catch (e) {
    logAndKill(`An error happened: ${e.message}`)
  }
}
