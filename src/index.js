const fs = require('fs')
const path = require('path')
const jsonServer = require('json-server')
const chalk = require('chalk')
const utils = require('./utils')
const libs = require('./libs')
const package = require('../package.json')
const custom = require('../custom.json')

const port = utils.toPort(process.argv)
const server = jsonServer.create()
const router = jsonServer.router(libs.getAllResponses(port))
const middlewares = jsonServer.defaults()

server.use(middlewares)

if (fs.existsSync(path.join(__dirname, 'routes.json'))) {
  const routes = require(path.join(__dirname, 'routes.json'))
  server.use(jsonServer.rewriter(routes))
  utils.log()
  utils.log(chalk.bold('Other routes'))
  for (const [key, value] of Object.entries(routes)) {
    utils.log(`${key} -> ${value}`)
  }
}

utils.log()
utils.log(chalk.bold('Custom routes'))

const maxKeyLength = Math.max(...Object.keys(custom).map((v) => v.length))
Object.keys(custom).forEach((path) => {
  utils.log(
    `${path.padEnd(maxKeyLength)} | ${utils.toProperties(custom[path], [
      'body',
    ])} `,
  )
})

server.use(router)
server.listen(port, () => {
  utils.log()
  utils.log(chalk.gray(`${package.name} is running`))
  utils.log()
})

router.render = (req, res) => {
  const path = Object.keys(custom).find((path) =>
    req._parsedOriginalUrl.path.includes(path),
  )

  const delay = +((custom[path] && custom[path].delay) || 0)

  setTimeout(() => {
    if (path) {
      res.status(+custom[path].status).jsonp(custom[path].body)
      return
    }

    res.jsonp(res.locals.data)
  }, delay)
}
