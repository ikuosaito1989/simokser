const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const utils = require('./utils')

module.exports = {
  /**
   * Get the result of merging all json objects in the fixtures directory
   *
   * @param {Number} port
   *
   * @returns {Object} An object containing all responses
   **/
  getAllResponses(port) {
    const targetDir = 'fixtures'
    const files = fs.readdirSync(targetDir)
    let results = {}
    utils.log()
    utils.log(chalk.bold('Resources'))
    for (let i = 0; i < files.length; i++) {
      const json = fs.readFileSync(`${targetDir}/${files[i]}`, 'utf-8')
      const jsonObj = utils.parseJson(json, `${targetDir}/${files[i]}`)
      if (!jsonObj) {
        continue
      }

      utils.log(`http://localhost:${port}/${files[i].replace('.json', '')}`)
      const resource = path.parse(files[i]).name
      results = Object.assign({ [path.parse(resource).name]: jsonObj }, results)
    }
    return results
  },
}
