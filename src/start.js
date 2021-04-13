const utils = require('./utils')
const package = require('../package.json')
const nodemon = require('nodemon')
const chalk = require('chalk')
const port = utils.toPort(process.argv)

nodemon({
  script: 'src/index.js',
  args: [`--p=${port}`],
  ext: 'json',
})

nodemon
  .on('start', () => {
    utils.log()
    utils.log(chalk.cyan(`${package.name} has started`))
  })
  .on('quit', () => {
    utils.log(`${package.name} has quit`)
    process.exit()
  })
  .on('restart', (files) => {
    utils.log(`${package.name} restarted due to: ${files}`)
  })
