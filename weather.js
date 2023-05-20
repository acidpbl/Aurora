const input = document.querySelector(".city"),
  temperature = document.querySelector(".temp"),
  humidity = document.querySelector(".humidity"),
  pressure = document.querySelector(".pressure");

const weather_api = "1de936f2905693fdd1d19b7aa8bbc257";

async function makeAPICall() {
  const city = document.getElementById("value").value;

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather_api}&units=metric`;
  const result = await fetch(URL);
  result.json().then((data) => {
    const main = data.main;
    const tempFull = main.temp.toString();
    const temp = tempFull.split(".")[0];

    const hum = main.humidity;
    const press = main.pressure;

    temperature.textContent = `${temp}°`;
    humidity.textContent = `Humidity: ${hum}%`;
    pressure.textContent = `Pressure: ${press}hPa`;
  });
}

document.getElementById("input").onclick = function () {
  makeAPICall();
};
