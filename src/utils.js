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

  /**
   * Get the number of deley from the query
   *
   * @param {String} query
   *
   * @returns {Number} port number
   */
  toDelay(query) {
    if (!query) {
      return 0
    }

    return +query.replace('delay=', '')
  },

  /**
   * Get Key,value string from object
   *
   * @param {Object} object
   * @param {String[]} except Properties to exclude
   *
   * @returns {String}
   */
  toProperties(object, except) {
    const properties = Object.keys(object)
      .filter((v) => !except.includes(v))
      .map(
        (key) => `${key.charAt(0).toUpperCase() + key.slice(1)}:${object[key]}`,
      )

    return properties.join(', ')
  },
}
