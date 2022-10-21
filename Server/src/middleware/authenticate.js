

require("dotenv").config()

const jwt = require("jsonwebtoken")

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return reject(err)
            }
            return resolve(decoded)
        })
    })
}


const authenticate = async (req, res, next) => {
    let decoded;
    const headerToken = req.headers.authorization;
    console.log(req.headers)
    if (!headerToken) {
    //   throw new HttpError(401, ErrorMessage.STATUS_401_NO_TOKEN);
    // res.status(401)
    throw new Error("asfsafasfasfasfsaf")
    }
    if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
    //   throw new HttpError(401, ErrorMessage.STATUS_401_NO_TOKEN);
      throw new Error("Test error")

    }
    const token = headerToken.split(" ")[1];

    try {
       
        decoded = await verifyToken(token)
        req.user = decoded;
        next()
    } catch (error) {
        console.log(error)
        return res.status(400).send({ message: "Authorization token not found or incorrect" })
    }

}

module.exports = authenticate