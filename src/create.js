const { execSync } = require('child_process')
const fs = require('fs')
const upath = require('upath')
const { version } = require('../package.json')

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
  console.error(`👉 Docs:
    npx @bloomtools/react todos # replace "todos" with desired project name
    npx @bloomtools/react@0.0.3 todos # replace "O.O.3" with desired version
    npx @bloomtools/react # a default project name "react-project" is used
  `)
  process.exit(1)
}

module.exports = function () {
  const [, , projName = 'react-project'] = process.argv

  if (fs.existsSync(projName)) {
    logAndKill(`\n💀 Directory ${projName} already exists. Aborting!\n`)
  }

  const sourceFolderPath = upath.normalize(upath.join(__dirname, '../react-project'))
  const destinationFolderPath = upath.normalize(upath.join(process.cwd(), projName))

  const start = () => {
    console.log(`\n✨ Creating project at ${destinationFolderPath} ...`)

    execSync(`cp -R ${sourceFolderPath} ${destinationFolderPath}`)

    const time = getTime()
    const readme = upath.normalize(upath.join(destinationFolderPath, 'README.md'))

    fs.appendFileSync(readme, `\n**Project created with [@bloomtools/react@${version}](https://github.com/bloominstituteoftechnology/npm-tools-react) and Node ${process.version} on ${time}**\n`, 'utf-8')

    console.log(`✨ Project ${projName} created on ${time}`)
    console.log(`✨ Using @bloomtools/react@${version} and Node ${process.version}\n`)
    console.log(`👉 NEXT STEPS:
    1- cd into the ${projName} directory
    2- execute npm install
    3- execute npm run dev
    4- load app in http://localhost:3003
    5- open ${projName} project in VSCode

    ❗ Check ${projName}/package.json for other scripts
    ❗ Problems? Seek support from Bloom staff!

    ❤️ Happy Hacking!\n`)
  }
  try {
    start()
  } catch (e) {
    logAndKill(`💀 An error happened: ${e.message}`)
  }
}
