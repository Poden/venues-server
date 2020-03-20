const xss = require('xss')


const VenueService = {
  getAllVenues(db) {
    return db
    .from('venues AS vns')
      .select(
        'vns.id',
        'vns.venue_name',
        'vns.zipcode',
        'vns.website',
         )
      },


      insertVenue(db, newVenue) {
        return db
          .insert(newVenue)
          .into('venues')
          .returning('*')
          .then(([venue]) => venue)
          // .then(venue =>
          //   this.getById(db, crt.id)
          // )
      },
      
      serializeVenues(venues){
        return venues.map(this.serializeVenue)
      },


      serializeVenue(venue) {
        return {
          id: venue.id,
          venue_name: venue.venue_name,
          zipcode: venue.zipcode,
          website: venue.website,
          
          
        }
      }
    }


    module.exports = VenueService