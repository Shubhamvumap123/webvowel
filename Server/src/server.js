
const connect = require("./configs/db")
const app = require("./index")
require('dotenv').config()

PORT = process.env.PORT || 5000

app.listen(PORT, async () => {
    try {
        await connect()
        console.log(`Server running Successfully on Port - ${PORT}`)
    } catch (error) {
        console.log(error)
    }
})