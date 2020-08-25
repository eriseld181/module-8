const express = require("express")
const cors = require("cors")
const { join } = require("path")
const listEndpoints = require("express-list-endpoints")
const mongoose = require("mongoose")

const server = express()

server.use(cors())
const port = process.env.PORT

const staticFolderPath = join(__dirname, "../public")
server.use(express.static(staticFolderPath))
server.use(express.json())


mongoose
    .connect("mongodb://localhost:27017/m8-db", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(
        server.listen(port, () => {
            console.log("Running on port", port)
        })
    )
    .catch((err) => console.log(err))
