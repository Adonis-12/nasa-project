const http = require('http')

require('dotenv').config()

const mongoose = require('mongoose')

const {loadAllPlanets} = require('./models/planets.model')

const app = require('./app')

const server = http.createServer(app)

const PORT = process.env.PORT || 8000

const MONGO_URL = process.env.MONGO_URL

mongoose.connection.once('open', () => {
    console.log("Connected to mongoose server")
})
mongoose.connection.on('error', (err) => {
    console.error("Failed to connect :",err)
})
async function startServer(){
    await mongoose.connect(MONGO_URL)
    await loadAllPlanets()
    server.listen(PORT,() => {
        console.log(`The server is running on port number ${PORT}`)
    })
}
startServer()