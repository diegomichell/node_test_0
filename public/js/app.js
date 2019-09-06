const searchForm = document.getElementById("search");
const addressInput = document.querySelector('input[name="address"]');
const resultsContainer = document.querySelector(".results-container");

searchForm.addEventListener("submit", async e => {
  e.preventDefault();

  const currentContent = resultsContainer.innerHTML;
  resultsContainer.innerHTML = "Loading...";
  const res = await fetch(`/weather?address=${addressInput.value}`);
  const { temperature, precipProbability, location } = await res.json();
  resultsContainer.innerHTML = currentContent;
  const tempetureField = document.getElementById("tempeture");
  const prepcipabilityField = document.getElementById("prepcipability");
  const locationField = document.getElementById("location");
  tempetureField.value = `${temperature}°`;
  prepcipabilityField.value = `${precipProbability}%`;
  locationField.value = location;
});
