const express = require('express');
const router = express.Router();
const {
  database
} = require('../config/helpers');

/* GET ALL ORDERS */
router.get('/', (req, res) => {
  database.table('orders_details as od')
    .join([{
        table: 'orders as o',
        on: 'o.id = od.order_id'
      },
      {
        table: 'products as p',
        on: 'p.id =od.product.id'
      },
      {
        table: 'users as u',
        on: 'u.id = o.user_id'
      }
    ])
    .withFields(['o.id', 'p.title as name', 'p.description', 'p.price', 'u.username'])
    .sort({
      id: 1
    })
  getAll()
    .then(orders => {
      if (orders.length > 0) {
        res.status(200).json(orders);
      } else {
        res.json({
          message: 'No orders found'
        });
      }
    }).catch(err => console.log(err));
});

// GET SINGLE ORDER
router.get('/:id', async (req, res) => {
  let orderId = req.params.id;
  console.log(orderId);

  database.table('orders_details as od')
    .join([{
        table: 'orders as o',
        on: 'o.id = od.order_id'
      },
      {
        table: 'products as p',
        on: 'p.id =od.product.id'
      },
      {
        table: 'users as u',
        on: 'u.id = o.user_id'
      }
    ])
    .withFields(['o.id', 'p.title', 'p.description', 'p.price', 'p.image', 'od.quantity as  quantityOrdered'])
    .filter({
      'o.id': orderId
    })
  getAll()
    .then(orders => {
      if (orders.length > 0) {
        res.json(orders);
      } else {
        res.json({
          message: 'No orders found'
        });
      }
    }).catch(err => res.json(err));

});

module.exports = router;