const request = require("request");

function getGeoCode(address) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?limit=1&access_token=pk.eyJ1IjoiZGllZ29taWNoZWwiLCJhIjoiY2swNWZwczhlMDE4ZTNudGUzbWg2YXpuMCJ9.LsxytlMz4ACIaQ-SsQ3zTw`;

  return new Promise((resolve, reject) => {
    request.get({ url, json: true }, (error, { body }) => {
      if (error || body.error) {
        reject(error);
        return;
      } else if (body.features.length === 0) {
        reject("Unable to find location. Try another search.");
        return;
      }

      const { features } = body;
      const town = features[0];
      resolve({
        latitude: town.center[1],
        longitude: town.center[0],
        location: town.text
      });
    });
  });
}

module.exports = {
  getGeoCode
};
