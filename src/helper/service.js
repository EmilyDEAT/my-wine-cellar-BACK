require('dotenv').config()
const jwt = require('jsonwebtoken')

const port = process.env.PORT
const secret = process.env.JWT_SECRET

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1]
    jwt.verify(token, secret, (err, result) => {
      if (err) {
        return res.status(401).send(err.message)
      }
      req.user = result
      next()
    })
  } else {
    return res.status(401).send('no token provided')
  }
}


module.exports = { secret, port, verifyToken }