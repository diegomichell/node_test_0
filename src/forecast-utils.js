const request = require("request");
const { getGeoCode } = require("./map-utils");

const forecast = address => {
  return new Promise((resolve, reject) => {
    getGeoCode(address).then(geo => {
      const { latitude, longitude, location } = geo;
      const url = `https://api.darksky.net/forecast/ddad074197ba96b4cdb91467625a3a06/${latitude},${longitude}`;

      request.get({ url, json: true }, (error, { body }) => {
        const {
          currently: { temperature, precipProbability }
        } = body;

        if (body.error) {
          reject(body.error);
          return;
        }

        resolve({
          temperature,
          precipProbability,
          location
        });
      });
    });
  });
};

module.exports = {
  forecast
};
