const fs = require('fs')
const path = require('path')
const jsonServer = require('json-server')
const chalk = require('chalk')
const utils = require('./utils')
const libs = require('./libs')
const package = require('../package.json')
const errors = require('../errors.json')

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
utils.log(chalk.bold('Error routes'))
Object.keys(errors).forEach((path) => {
  utils.log(`${path} -> ${errors[path].statusCode}`)
})

server.use(router)
server.listen(port, () => {
  utils.log()
  utils.log(chalk.gray(`${package.name} is running`))
  utils.log()
})

router.render = (req, res) => {
  const path = Object.keys(errors).find((path) =>
    req._parsedOriginalUrl.path.includes(path),
  )
  if (path) {
    res.status(+errors[path].statusCode).jsonp({
      error: errors[path].message,
    })
    return
  }

  res.jsonp(res.locals.data)
}
