const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { forecast } = require("./forecast-utils");

const app = express();

app.set("views", path.join(__dirname, "../templates/views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "../public")));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

app.get("/forecast", (req, res) => {
  const address = req.query.address;

  forecast(address)
    .then(currently => {
      res.type("text/html");
      res.send(
        `In ${currently.location} it is currently ${currently.temperature} degress out. There is a ${currently.precipProbability}% chance of rain.`
      );
    })
    .catch(error => {
      console.error(error);
    });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;

  if (!address) {
    res.json({
      error: "You need to provide an address"
    });
    return;
  }

  forecast(address)
    .then(currently => {
      res.json(currently);
    })
    .catch(error => {
      console.error(error);
    });
});

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather app",
    author: "Diego Michel"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Weather app",
    author: "Diego Michel"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Weather app",
    author: "Diego Michel"
  });
});

app.listen(3000, () => {
  console.log("Server is running in port 3000");
});
