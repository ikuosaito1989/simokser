const fs = require('fs')
const path = require('path')
const jsonServer = require('json-server')
const chalk = require('chalk')
const utils = require('./utils')
const libs = require('./libs')
const package = require('../package.json')

utils.log()
utils.log(chalk.cyan(`${package.name}:${package.version}`))

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

server.use(router)
server.listen(port, () => {
  utils.log()
  utils.log(chalk.gray(`${package.name} is running`))
})

router.render = (req, res) => {
  if (req.url.includes('error')) {
    res.status(500).jsonp({
      error: 'error message here',
    })
    return
  }

  res.jsonp(res.locals.data)
}
