const express = require('express')
const routes = require('./src/routes/index')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/users', routes.User)

app.listen(process.env.PORT, (error) => {
  if (error) {
    console.log('Something bad happened...', error)
  } else {
    console.log(`server is listening on port ${process.env.PORT}`)
  }
})
