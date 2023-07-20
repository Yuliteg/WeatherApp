import axios from 'axios';
import { updateSelectedCity } from './weatherHelpers';
import { API_KEY_IPIFY, API_KEY_WEATHER } from '../env.js';

export const fetchCurrentLocationWeather = async (selectedCity, isLoading) => {
  isLoading.value = true;
  try {
    const ipResponse = await axios.get('https://api.ipify.org?format=json');
    const ipAddress = ipResponse.data.ip;

    const geoResponse = await axios.get(`https://ipapi.co/${ipAddress}/json/?access_key=${API_KEY_IPIFY}`);
    const { latitude, longitude } = geoResponse.data;

    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY_WEATHER}`
    );

    updateSelectedCity(weatherResponse.data, selectedCity);
  } catch (error) {
    console.error('Error fetching current location weather:', error);
  } finally {
    isLoading.value = false;
  }
};