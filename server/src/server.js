const http = require('http')

const {loadAllPlanets} = require('./models/planets.model')

const app = require('./app')

const server = http.createServer(app)

const PORT = process.env.PORT || 8000

async function startServer(){
    await loadAllPlanets()
    server.listen(PORT,() => {
        console.log(`The server is running at port ${PORT}`)
    })
}
startServer();