const chalk = require('chalk')

module.exports = {
  /**
   * Converts a JavaScript Object Notation (JSON) string into an object.
   * If an error occurs, a log is output
   *
   * @param {String} json
   * @param {String} path json path
   *
   * @returns {Object} Parsed objects
   */
  parseJson(json, path) {
    let jsonObj = null

    try {
      jsonObj = JSON.parse(json)
    } catch (error) {
      console.error(chalk.red(`  ${path}: ${error}`))
    }

    return jsonObj
  },

  /**
   * console.log with spaces
   *
   * @param {String} message
   */
  log(message) {
    if (!message) {
      console.log()
      return
    }

    console.log(`  ${message}`)
  },

  /**
   * Return the port number from the argument
   *
   * @param {String} args
   *
   * @returns {Number} port number
   */
  toPort(args) {
    const port = args.find((v) => v.includes('--port') | v.includes('--p'))
    return port ? port.replace('--port=', '').replace('--p=', '') : 3000
  },
}
