const express = require('express');
const VenueService = require('./venues-service');
const venuesRouter = express.Router();

const jsonParser = express.json();

venuesRouter
  .route('/')
  .get((req, res, next) => {
    VenueService.getAllVenues(req.app.get('db'))
      .then(venues => {
        console.log('venues', venues);
        res.json(VenueService.serializeVenues(venues));
      })
      .catch(next);
  })

  .post(jsonParser, (req, res, next) => {
    const { venue_name, zipcode, website } = req.body;
    const newVenue = { venue_name, zipcode, website };
    console.log(newVenue);

    for (const [key, value] of Object.entries(newVenue))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })

    VenueService.insertVenue(
      req.app.get('db'),
      newVenue
    )
      .then(venue => {
        res
          .status(201)
          // .location(path.posix.join(req.originalUrl, `/${venue.id}`))
          .json(VenueService.serializeVenue(venue));
      })
      .catch(next);
  });



module.exports = venuesRouter;