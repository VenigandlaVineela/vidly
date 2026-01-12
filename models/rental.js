const Joi = require('joi');
const mongoose = require('mongoose');
const moment = require('moment');

const rentalSchema = new mongoose.Schema({
     customer: {
          type: new mongoose.Schema({
               name: {
                    type: String,
                    required: true,
                    minlength: 5,
                    maxlength: 255
               },
               isGold: {
                    type: Boolean,
                    required: false
               },
               phone: {
                    type: String,
                    required: true,
                    minlength: 5,
                    maxlength: 50
               },
          }),
          required: true
     },
     movie: {
          type: new mongoose.Schema({
               title: {
                    type: String,
                    required: true,
                    trim: true,
                    minlength: 5,
                    maxlength: 255
               },

               dailyRentalRate: {
                    type: Number,
                    required: true,
                    minlength: 0,
                    maxlength: 255
               }
          }),
          required: true
     },
     dateOut: {
          type: Date,
          required: true,
          default: Date.now
     },
     dateReturned: {
          type: Date,
     },
     rentalFee: {
          type: Number,
          min: 0
     }
});

rentalSchema.methods.return = function() {
     this.dateReturned = new Date();
     const rentalDays = moment().diff(moment(this.dateOut), 'days');
     this.rentalFee = rentalDays * this.movie.dailyRentalRate;
};

rentalSchema.statics.lookup = function(customerId, movieId) {
     return this.findOne({
          'customer._id': customerId,
          'movie._id': movieId
     });
};

const Rental = mongoose.model('Rental', rentalSchema);



function validateRental(rental) {
     const schema = Joi.object({
          customerid: Joi.string().required(),
          movieId: Joi.string().required(),
     });
     return schema.validate(rental);
}

exports.validate = validateRental;
exports.Rental = Rental;


