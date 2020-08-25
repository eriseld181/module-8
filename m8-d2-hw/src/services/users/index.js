const express = require("express")
const q2m = require("query-to-mongo")
const { basic } = require("../auth")

const UserSchema = require("./schema")
const usersRouter = express.Router()
usersRouter.get("/", basic, async (req, res, next) => {
    try {
        const query = q2m(req.query)

        const users = await UserSchema.find(query.criteria, query.options.fields)
            .skip(query.options.skip)
            .limit(query.options.limit)
            .sort(query.options.sort)

        res.send({
            data: users,
            total: users.length,
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
})


usersRouter.get("/me", basic, async (req, res, next) => {
    try {
        res.send(req.user)
    } catch (error) {
        next("While reading users list a problem occurred!")
    }
})

usersRouter.post("/", async (req, res, next) => {
    try {
        const newUser = new UserSchema(req.body)
        const { _id } = await newUser.save()

        res.status(201).send(_id)
    } catch (error) {
        next(error)
    }
})

module.exports = usersRouter