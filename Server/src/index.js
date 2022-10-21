
const express = require("express")

const { register, login ,verify, getUser} = require("./controllers/user.controller")

const cors = require('cors')
const authenticate = require("./middleware/authenticate")
// const taskController = require("./controllers/task.controller")

const app = express()
app.use(express.json())
app.use(cors())

app.post("/register", register)
app.post("/login", login)
app.get("/verify/:id/:token", verify)
// app.use("/task", taskController)

app.get("/user",authenticate, getUser)

module.exports = app