const input = document.querySelector(".city"),
  temperature = document.querySelector(".temp"),
  icon = document.querySelector(".weather-icon"),
  humidity = document.querySelector(".humidity"),
  pressure = document.querySelector(".pressure");

const weather_api = "1de936f2905693fdd1d19b7aa8bbc257";

function validateInt(value) {
  if (value.trim().length) {
    return true;
  }
  return false;
}

if (!icon.src) icon.classList.add("hidden");

async function makeAPICall() {
  const city = document.getElementById("value").value;

  if (validateInt(city)) {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather_api}&units=metric`;
    const result = await fetch(URL);
    result.json().then((data) => {
      const main = data.main;
      const tempFull = main.temp.toString();
      const temp = tempFull.split(".")[0];

      const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
      console.log(iconURL);

      icon.src = iconURL;

      if (icon.src == iconURL) icon.classList.remove("hidden");

      const hum = main.humidity;
      const press = main.pressure;

      temperature.textContent = `${temp}°`;
      humidity.textContent = `Humidity: ${hum}%`;
      pressure.textContent = `Pressure: ${press}hPa`;
    });
  }
}

document.getElementById("input").onclick = function () {
  makeAPICall();
};

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    makeAPICall();
  }
});
