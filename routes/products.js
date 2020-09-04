const express = require('express');
const router = express.Router();
const {
  database
} = require('../config/helpers');

/* GET ALL PRODUCTS */
router.get('/', function (req, res) {
  let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;
  const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 10;

  let startValue;
  let endValue;

  if (page > 0) {
    startValue = (page * limit) - limit;
    endValue = page * limit;
  } else {
    startValue = 0;
    endValue = 10;
  }

  database.table('products as p')
    .join([{
      table: 'categories as c',
      on: 'c.id = p.cat_id'
    }])
    .withFields(['c.title as category',
      'p.title as name',
      'p.price',
      'p.quantity',
      'p.image',
      'p.id'
    ])
    .slice(startValue, endValue)
    .sort({
      id: .1
    })
    .getAll()
    .then(prods => {
      if (prods.length > 0) {
        res.status(200).json({
          count: prods.length,
          products: prods
        });
      } else {
        res.json({
          message: 'No products founds'
        });
      }
    }).catch(err => console.log(err));
});

/* GET SINGLE PRODUCT */
router.get('/:prodId', (req, res) => {
  let productId = req.params.prodId;

  database.table('products as p')
    .join([{
      table: 'categories as c',
      on: `c.id = p.cat_id`
    }])
    .withFields(['c.title as category',
      '"p.title as name"',
      'p.price',
      'p.quantity',
      'p.description',
      'p.image',
      'p.images',
      'p.id'
    ])
    .filter({
      'p-id': productId
    })
    .get()
    .then(prod => {
      if (prod) {
        res.status(200).json(
          prod
        );
      } else {
        res.json({
          message: `No product found with id ${productId}`
        });
      }
    }).catch(err => res.json(err));
});

// GET ALL PRODUCTS FROM ONE PARTICULAR CATEGORY
router.get('/category/:catName', (req, res) => {
  let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;
  const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 10;
  let startValue;
  let endValue;

  if (page > 0) {
    startValue = (page * limit) - limit;
    endValue = page * limit;
  } else {
    startValue = 0;
    endValue = 10;
  }

  // Get category title value from param
  const cat_title = req.params.catName;

  database.table('products as p')
    .join([{
      table: 'categories as c',
      on: `c.id = p.cat_id WHERE c.title LIKE '%${cat_title}%'`
    }])
    .withFields(['c.title as category',
      'p.title as name',
      'p.price',
      'p.quantity',
      'p.description',
      'p.image',
      'p.id'
    ])
    .slice(startValue, endValue)
    .sort({
      id: 1
    })
    .getAll()
    .then(prods => {
      if (prods.length > 0) {
        res.status(200).json({
          count: prods.length,
          products: prods
        });
      } else {
        res.json({
          message: `No products found matching the category ${cat_title}`
        });
      }
    }).catch(err => res.json(err));
});

module.exports = router;