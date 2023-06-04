const { execSync } = require('child_process')
const fs = require('fs')
const upath = require('upath')
const { version } = require('./package.json')

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
    npx @bloomtools/react@0.0.3 todos # to use a specific version of the tool
    npx @bloomtools/react # a default project name "react-project" is used
  `)
  process.exit(1)
}

module.exports = function () {
  const [, , projName = 'react-project'] = process.argv

  if (fs.existsSync(projName)) {
    logAndKill(`💀 Directory ${projName} already exists. Aborting`)
  }

  const sourceFolderPath = upath.normalize(upath.join(__dirname, '../react-project'))
  const destinationFolderPath = upath.normalize(upath.join(process.cwd(), projName))

  const start = () => {
    console.log(`✨ Creating project ${projName} at ${destinationFolderPath} ...`)

    execSync(`cp -R ${sourceFolderPath} ${destinationFolderPath}`)

    const readme = upath.normalize(upath.join(destinationFolderPath, 'README.md'))

    fs.appendFileSync(readme, `**Project generated with @bloomtools/react@${version}**\n`, 'utf-8')

    console.log(`✨ Project ${projName} created on ${getTime()}`)
    console.log(`✨ START CODING:
      1- cd into the ${projName} folder
      2- execute "npm install"
      3- execute "npm run dev"
      4- see the app loading at "http://localhost:3003"
      5- open ${projName} project in VSCode

      ❗ Check ${projName}/package.json for other scripts

      ❤️ Happy Hacking!
    `)
  }
  try {
    start()
  } catch (e) {
    logAndKill(`💀 An error happened: ${e.message}`)
  }
}
