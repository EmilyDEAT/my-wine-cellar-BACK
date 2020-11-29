const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
dotenv.config()

const connection = require('../helper/config')

router.get('/:id/wines', (req, res) => {
  const user = req.params.id
  const sql = 'SELECT * FROM user_wine as uw INNER JOIN wine as w ON uw.wine_id = w.id WHERE uw.user_id = ?'
  connection.query(sql, user,
    (error, results) => {
      if (error) {
        res.status(500).json({ error: `Unable to fetch wine data for user ${user}` })
      } else {
        res.status(200).json(results)
      }
    }
  )
})

module.exports = router