var express = require('express');
var router = express.Router();
var { User } = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.get('/createUser', function(req, res, next) {
//   User.create({
//     username: 15640623660,
//     password: 'zxs997997'
//   });
//   res.send('创建成功')
// })

module.exports = router;
