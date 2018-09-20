export const requestUrl = (lat, lon) => {
  const key = "b9c5bc33bff97fe332e879d054cebbda";
  return `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${key}`;
};

export const currentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });    
  }).catch(e => new Error(e));
};

export const extractPosition = position => ({
  lat: position.coords.latitude,
  lon: position.coords.longitude
});
