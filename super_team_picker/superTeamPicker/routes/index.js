const express = require('express');
const router = express.Router();
const knex = require('../db');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('cohorts');
});

module.exports = router;
