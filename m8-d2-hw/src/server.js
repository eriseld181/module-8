const express = require("express")
const port = process.env.PORT || 3003
const cors = require("cors")
const { join } = require("path")
const listEndpoints = require("express-list-endpoints")
const mongoose = require("mongoose")

const server = express()
const staticFolderPath = join(__dirname, "../public")

const usersRouter = require("./services/users")

server.use(cors())
server.use(express.static(staticFolderPath))
server.use(express.json())

server.use("/users", usersRouter)

console.log('The value of PORT is:', process.env.PORT);
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