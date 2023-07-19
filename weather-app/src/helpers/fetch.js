import axios from 'axios';
import { updateSelectedCity } from './weatherHelpers';

const API_KEY_IPIFY = 'f325833cecb436c2b5eb61d2ab763959';
const API_KEY_WEATHER = 'a33819175e02801b2b4ee9eb562676ad';

export const fetchCurrentLocationWeather = async (selectedCity) => {
  try {
    const ipResponse = await axios.get('https://api.ipify.org?format=json');
    const ipAddress = ipResponse.data.ip;

    const geoResponse = await axios.get(`https://ipapi.co/${ipAddress}/json/?access_key=${API_KEY_IPIFY}`);
    const { latitude, longitude } = geoResponse.data;

    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY_WEATHER}`
    );

    console.log(weatherResponse);

    updateSelectedCity(weatherResponse.data, selectedCity);
  } catch (error) {
    console.error('Error fetching current location weather:', error);
  }
};