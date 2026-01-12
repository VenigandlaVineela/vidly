// const Joi = require('joi');
const {Customer,validate} = require('../models/customers')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



// const Customer = new mongoose.model('Customer', new mongoose.Schema({
//      name: {
//           type: String,
//           required: true,
//           minlength: 5,
//           maxlength: 50
//      },
//      isGold: {
//           type: Boolean,
//           default: false
//      },
//      phone: {
//           type: String,
//           required: true,
//           minlength: 5,
//           maxlength: 50
//      }
// }));


// GET all
router.get('/', async (req, res) => {
     const customers = await Customer.find().sort('name');
     res.send(customers);
});

// POST
router.post('/', async (req, res) => {
     const { error } = validate(req.body);
     if (error) return res.status(400).send(error.details[0].message);

     let customer = new Customer({
          name: req.body.name,
          isGold: req.body.isGold,
          phone: req.body.phone
     });
     customer = await customer.save();
     res.send(customer);
});

// PUT
router.put('/:id', async (req, res) => {
     const { error } = validate(req.body);
     if (error) return res.status(400).send(error.details[0].message);

     const customer = await Customer.findByIdAndUpdate(req.params.id, {
          name: req.body.name,
          isGold: req.body.isGold,
          phone: req.body.phone
     },{ new: true }
     );

     if (!customer) return res.status(404).send("Genre not found");

     res.send(customer);
});

// DELETE
router.delete('/:id', async (req, res) => {
     const customer = await Customer.findByIdAndRemove(req.params.id);

     if (!customer) return res.status(404).send("Customer not found");

     res.send(customer);
});

// GET by ID
router.get('/:id', async (req, res) => {
     const customer = await Customer.findById(req.params.id);

     if (!customer) return res.status(404).send("customer not found");

     res.send(customer);
});


// function validateCustomer(customer) {
//      const schema = Joi.object({
//           name: Joi.string().min(5).max(50).required(),
//           phone: Joi.string().min(5).max(50).required(),
//           isGold:Joi.Boolean()
//      });

//      return schema.validate(customer);
// }

module.exports = router;
