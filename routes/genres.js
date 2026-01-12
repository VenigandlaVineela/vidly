const express = require('express');
const Joi = require('joi');
 const router = express.Router();


const genres = [
     { id: 1, name: 'Action' },
     { id: 2, name: 'Comedy' },
     { id: 3, name: 'Drama' }
]

//get all genres
router.get('/', (req, res) => {
     res.send(genres);
     console.log('Genres sent successfully');
});

//get genre by id
router.get('/:id', (req, res) => {
     const genre = genres.find(c => c.id === parseInt(req.params.id));
     if (!genre)
          return res.status(404).send('The genre with the given ID was not found.');
     res.send(genre);
})


//create new genre
router.post('/', (req, res) => {
     
     const schema = Joi.object({
          name: Joi.string().min(3).required()
     });
     const result = schema.validate(req.body);
     if (result.error)
          return res.status(404).send(result.error.details[0].message);
     const genre = {
          id: genres.length + 1,
          name: req.body.name
     };
     genres.push(genre);
     res.send(genre);
});


//update genre
router.put('/:id', (req, res) => {
     const genre = genres.find(c => c.id === parseInt(req.params.id));
     if (!genre)
          return res.status(404).send('The genre with the given ID was not found.');

     const schema = Joi.object({
          name: Joi.string().min(3).required()
     });
     const result = schema.validate(req.body);
     if (result.error)
          return res.status(404).send(result.error.details[0].message);
     genre.name = req.body.name;
     res.send(genre);
})


//delete genre
router.delete('/:id', (req, res) => {
     const genre = genres.find(c => c.id === parseInt(req.params.id));
     if (!genre)
          return res.status(404).send('The genre with the given ID was not found.');
     const index = genres.indexOf(genre);
     genres.splice(index, 1);
     res.send(genre);
});


module.exports = router;