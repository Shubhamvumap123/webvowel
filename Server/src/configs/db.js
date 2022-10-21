const mongoose = require("mongoose")
require('dotenv').config()
url = process.env.URL

module.exports = () => {
    return mongoose.connect(url)
}