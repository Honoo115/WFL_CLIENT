



// Assuming you have a restaurants array and a votes array
let resultMap = {};
votes.forEach(vote => {
  if( !resultMap.hasOwnProperty(vote.restaurant_id) ) {
    let restaurant = restaurants.find(restaurant => restaurant.id === vote.restaurant_id);
    resultMap[vote.restaurant_id] = {
      ...restaurant,
      votes: 1
    };
  } else {
    resultMap[vote.restaurant_id].votes += 1;
  };
});
let results = [];
for ( const key in resultMap ) {
  results.push(resultMap[key])
};
results.sort((a,b) => b.votes - a.votes);


























export default {
    "uuid": "85251b5c-c0a4-4e08-98fa-4fac3dffa2c3"
    "restaurants": [
      {
        "id": 39814,
        "name": "AQUA by El Gaucho",
        "address": "2801 Alaskan Way",
        "city": "Seattle",
        "state": "WA",
        "area": "Seattle / Eastern Washington",
        "postal_code": "98121",
        "country": "US",
        "phone": "2069569171x",
        "lat": 47.614422,
        "lng": -122.354045,
        "price": 4,
        "reserve_url": "http://www.opentable.com/single.aspx?rid=39814",
        "mobile_reserve_url": "http://mobile.opentable.com/opentable/?restId=39814",
        "image_url": "https://www.opentable.com/img/restimages/39814.jpg"
      },
      {
        "id": 3274,
        "name": "Lola Seattle",
        "address": "2000 Fourth Avenue",
        "city": "Seattle",
        "state": "WA",
        "area": "Seattle / Eastern Washington",
        "postal_code": "98121",
        "country": "US",
        "phone": "2064411430",
        "lat": 47.613,
        "lng": -122.3399,
        "price": 3,
        "reserve_url": "http://www.opentable.com/single.aspx?rid=3274",
        "mobile_reserve_url": "http://mobile.opentable.com/opentable/?restId=3274",
        "image_url": "https://www.opentable.com/img/restimages/3274.jpg"
      },
      {
        "id": 1345,
        "name": "Assaggio",
        "address": "2010 4th Ave.",
        "city": "Seattle",
        "state": "WA",
        "area": "Seattle / Eastern Washington",
        "postal_code": "98121",
        "country": "US",
        "phone": "2064411399",
        "lat": 47.613256,
        "lng": -122.34003,
        "price": 3,
        "reserve_url": "http://www.opentable.com/single.aspx?rid=1345",
        "mobile_reserve_url": "http://mobile.opentable.com/opentable/?restId=1345",
        "image_url": "https://www.opentable.com/img/restimages/1345.jpg"
      }
    ]
  };