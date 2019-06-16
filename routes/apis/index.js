var express = require('express');
var router = express.Router(); 
var usersRouter = require('./users');
var cricketRouter = require('./cricket');

router.use('/users', usersRouter);
router.use('/cricket', cricketRouter);

module.exports = router;
