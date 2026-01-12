const Joi = require('joi');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Genre, validate } = require('../models/genre');
const express = require('express');
const asyncMiddleware = require('../middleware/async');
const validateObjectId=require('../middleware/validateObjectId');
const mongoose = require('mongoose');
const router = express.Router();




// GET all
router.get('/', asyncMiddleware(async(req, res, next) => {
     // try {
     // throw new Error('could not get the genres')
          const genres = await Genre.find().sort('name');
          res.send(genres);
     // }
     // catch (ex) {
     //       next(ex)
     //      //log the exception
     //      // res.status(500).send("something faild");
          
     // }
}));

// POST
router.post('/', auth, asyncMiddleware(async(req, res) => {
     const { error } = validate(req.body);
     if (error) return res.status(400).send(error.details[0].message);

     let genre = new Genre({ name: req.body.name });
     genre = await genre.save();
     res.send(genre);
}));

// PUT
router.put('/:id', auth, asyncMiddleware(async (req, res) => {
     if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).send('Invalid ID.');

     const { error } = validate(req.body);
     if (error) return res.status(400).send(error.details[0].message);

     const genre = await Genre.findByIdAndUpdate(
          req.params.id,
          { name: req.body.name },
          { new: true }
     );

     if (!genre)
          return res.status(404).send("Genre not found");

     res.send(genre);
}));

// DELETE
router.delete('/:id', [auth, admin],asyncMiddleware( async (req, res) => {
     if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).send('Invalid ID.');

     const genre = await Genre.findByIdAndDelete(req.params.id);

     if (!genre)
          return res.status(404).send("Genre not found");

     res.send(genre);
}));

// GET by ID
router.get('/:id',validateObjectId, asyncMiddleware(async (req, res) => {
     const genre = await Genre.findById(req.params.id);

     if (!genre)
          return res.status(404).send("Genre not found");

     res.send(genre);
}));



module.exports = router;
