var searchBtn = document.getElementById("search-Btn");
var cityName = document.getElementById("textId")

searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var inputText = document.getElementById("textId");
  var cityInfo = inputText.value.trim();
  console.log(cityInfo)
  loadCityTemp(cityInfo, true);
});

function loadCityTemp(cityName) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&units=imperial&appid=1c0cffde06f615361d46691128753885"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var iconVar = data.weather[0].icon;
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      console.log(lat);
      console.log(lon);
      console.log(data);
      console.log(data.weather[0]);
      document.getElementById("face").textContent = data.name;
      document.getElementById("humid").textContent =
        "Humidity: " + data.main.humidity + "%";
      document.getElementById("wind").textContent =
        "Wind speed: " + data.wind.speed + "mph";
      document.getElementById("high").textContent =
        "The high: " + data.main.temp_max + "F";
      document.getElementById("low").textContent =
        "The Low: " + data.main.temp_min + "F";
      document.getElementById("temp").textContent =
        "The Temp: " + data.main.temp + "F";
      document.getElementById("weather").textContent =
        "The Weather: " + data.weather[0].description + "";
 
        fiveDay(lat, lon);
      icon.src = "https://openweathermap.org/img/wn/" + iconVar + ".png";
    });
function fiveDay(lat , lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=1c0cffde06f615361d46691128753885`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.daily[1].temp);
      console.log(data.daily[1].temp.max);
      console.log(data.daily[1].temp.min);
      console.log(data.daily[1].wind_speed);

      document.getElementById('maxD1').textContent = "H " +data.daily[1].temp.max+ "F"
      document.getElementById('minD1').textContent = "L " + data.daily[1].temp.min + "F"
      document.getElementById('humidD1').textContent = "humidity " +data.daily[1].humidity+"%"
      document.getElementById('windD1').textContent = "" +data.daily[1].wind_speed+" mph"

      document.getElementById('maxD2').textContent = "H " +data.daily[2].temp.max+ "F"
      document.getElementById('minD2').textContent = "L " + data.daily[2].temp.min + "F"
      document.getElementById('humidD2').textContent = "humidity " +data.daily[2].humidity+"%"
      document.getElementById('windD2').textContent = "" +data.daily[2].wind_speed+" mph"

      document.getElementById('maxD3').textContent = "H " +data.daily[3].temp.max+ "F"
      document.getElementById('minD3').textContent = "L " + data.daily[3].temp.min + "F"
      document.getElementById('humidD3').textContent = "humidity " +data.daily[3].humidity+"%"
      document.getElementById('windD3').textContent = "" +data.daily[3].wind_speed+" mph"

      document.getElementById('maxD4').textContent = "H " +data.daily[4].temp.max+ "F"
      document.getElementById('minD4').textContent = "L " + data.daily[4].temp.min + "F"
      document.getElementById('humidD4').textContent = "humidity " +data.daily[4].humidity+"%"
      document.getElementById('windD4').textContent = "" +data.daily[4].wind_speed+" mph"

      document.getElementById('maxD5').textContent = "H " +data.daily[5].temp.max+ "F"
      document.getElementById('minD5').textContent = "L " + data.daily[5].temp.min + "F"
      document.getElementById('humidD5').textContent = "humidity " +data.daily[5].humidity+"%"
      document.getElementById('windD5').textContent = "" +data.daily[5].wind_speed+" mph"
    });
}
}

if(newSearch) {
    var localStorageKey = `previousCities`;
    if(localStorage.getItem(localStorageKey)) {
        var cities = JSON.parse(localStorage.getItem(localStorageKey));
        cities.push(data.name);
        localStorage.setItem(localStorageKey, JSON.stringify(cities));
    } else {
        localStorage.setItem(localStorage, JSON.stringify([data.name]));
    }
    loadCityHistory();
}
newSearch();
function loadCityHistory() {
    historyDropdown.innerHTML = "";
    var localStorageKey = `previousCities`;
    var cities = JSON.parse(localStorage.getItem(localStorageKey));
    if (cities) {
        for (let i = cities.length; i>= cities.length - 10; i--) {
            var previousCity = document.createElement("li");
            previousCity.classList.add("prev-cities");
            previousCity.textContent =cities[i];
            previousCity.addEventListener("click", function() {
                console.log('test')
                loadCityTemp(cities[i], false);
            });
            historyDropdown.append(previousCity  );
        }
    }
}