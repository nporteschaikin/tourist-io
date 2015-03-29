var mongo = require('./../mongo')
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema;

module.exports = (function () {

  var Tour = new Schema({

    name: {
      type: String,
      required: 'Name is required!'
    },

    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: 'User is required!'
    },

    name: {
      type: 'string',
      required: 'Name is required!'
    },

    description: {
      type: 'string',
      required: 'Description is required!'
    },

    pins: [{

      name: {
        type: String,
        required: 'Pin name is required!'
      },

      category: {
        type: String,
        required: 'Pin category is required!'
      },

      address: {
        type: Array,
        required: 'Pin address is required!'
      },

      location: {
        type: [Number],
        index: '2dsphere'
      },

      description: {
        type: String,
        required: 'Pin description is required!'
      }

    }],

    createdAt: {
      type: Date,
      default: Date.now
    }

  });

  Tour.statics.findNear = function (latitude, longitude, maxDistance) {
    return this.find({
      "pins.location": {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: maxDistance
        }
      }
    });
  }

  return mongo.model('Tour', Tour);

}());
