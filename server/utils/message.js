const request = require('request');
var generateMessage = (from, text) => {
  return {
    from : from,
    text : text,
  }
}

var generateMessageLocation = (from, lat, lng) => {
  
  return new Promise((resolve,reject) => {
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDJeS1fL1Ku1SfqzFXFHB6BziEgd_gh3nI`,
      json:true
      }, (err, res, body) => {
        resolve({
          from: from,
          url : body.results[0].formatted_address,
        });
    });
      
  });
  
}

module.exports =  {
  generateMessage,
  generateMessageLocation,
}

