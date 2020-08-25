const express = require("express")
const cors = require("cors")
const { join } = require("path")
const listEndpoints = require("express-list-endpoints")
const mongoose = require("mongoose")
const port = process.env.PORT
const server = express()
const staticFolderPath = join(__dirname, "../public")

const usersRouter = require("./services/users")

server.use(cors())
server.use(express.static(staticFolderPath))
server.use(express.json())

server.use("/users", usersRouter)

mongoose
    .connect("mongodb://localhost:27017/m8-db", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(
        server.listen(3000, () => {
            console.log("Running on port", 3000)
        })
    )
    .catch((err) => console.log(err))