const { forecast } = require("./forecast-utils");

const address = process.argv[2];

forecast(address)
  .then(currently => {
    console.log(
      `In ${currently.location} it is currently ${currently.temperature} degress out. There is a ${currently.precipProbability}% chance of rain.`
    );
  })
  .catch(error => {
    console.error(error);
  });
