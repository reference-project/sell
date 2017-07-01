/**
 * Created by Exotic on 2017/7/1.
 */
var express = require('express')
var app = express()
var router = express.Router()
router.get('/', function (req, res, next) {
  req.url = '/index.html'
  next()
})
app.use(express.static('./dist'))
module.exports = app.listen(9000)
