const utils = require('./utils')
const package = require('../package.json')
const nodemon = require('nodemon')
const chalk = require('chalk')

nodemon({
  script: 'src/index.js',
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
