var express = require('express');
var router = express.Router(); 
var usersRouter = require('./users');
var cricketRouter = require('./cricket');
var liveRouter = require('./live');


router.use('/users', usersRouter);
router.use('/cricket', cricketRouter);
router.use('/live', liveRouter);


module.exports = router;
