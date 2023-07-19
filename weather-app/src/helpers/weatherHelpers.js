export function convertKelvinToCelsius(temperature) {
  return (temperature - 273.15).toFixed(2);
}

export function formatTime(time) {
  return time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export const updateSelectedCity = (data, selectedCity) => {
  selectedCity.name = data.name;
  selectedCity.desc = data.weather[0].main;
  selectedCity.sunrise = formatTime(new Date(data.sys.sunrise * 1000));
  selectedCity.sunset = formatTime(new Date(data.sys.sunset * 1000));
  selectedCity.temperature = convertKelvinToCelsius(data.main.temp);


  selectedCity.windData = data.wind;
};

