const fs = require('fs')
const path = require('path')
const jsonServer = require('json-server')
const chalk = require('chalk')

console.log()
console.log(chalk.cyan('  \\{^_^}/ hi!'))

const server = jsonServer.create()
const router = jsonServer.router(getAllResponses())
const middlewares = jsonServer.defaults()

const port = process.argv.find((v) => v.includes('--port') | v.includes('--p'))
const portNo = port && port.replace('--port=', '').replace('--p=', '')
server.use(middlewares)

if (fs.existsSync(path.join(__dirname, 'routes.json'))) {
  const routes = require(path.join(__dirname, 'routes.json'))
  server.use(jsonServer.rewriter(routes))
  console.log()
  console.log(chalk.bold('  Other routes'))
  for (const [key, value] of Object.entries(routes)) {
    console.log(`  ${key} -> ${value}`)
  }
}

server.use(router)
server.listen(+portNo || 3000, () => {
  console.log()
  console.log(chalk.gray('  simokser is running'))
})

router.render = (req, res) => {
  if (req.url.includes('error')) {
    res.status(500).jsonp({
      error: 'error message here',
    })
    return
  }

  res.jsonp({
    body: res.locals.data,
  })
}

/*
 * Get the result of merging all json objects in the fixtures directory.
 */
function getAllResponses() {
  const targetDir = 'fixtures'
  const directories = fs.readdirSync(targetDir)
  let results = {}
  console.log()
  console.log(chalk.bold('  Resources'))
  for (let i = 0; i < directories.length; i++) {
    console.log(
      `  http://localhost:4200/${directories[i].replace('.json', '')}`,
    )
    const json = fs.readFileSync(`${targetDir}/${directories[i]}`, 'utf-8')
    const resource = path.parse(directories[i]).name
    results = Object.assign(
      { [path.parse(resource).name]: JSON.parse(json) },
      results,
    )
  }
  return results
}
