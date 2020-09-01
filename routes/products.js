const express = require('express');
const router = express.Router();
const { database } = require('../config/helpers');



/* GET ALL PRODUCTS */
router.get('/', function(req, res) {
  let page = (req.query.page !== undefined && req.query.page !== 0 ) ? req.query.page : 1;
  const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 10; 

});

module.exports = router;
