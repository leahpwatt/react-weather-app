import React, { Component } from 'react';
import { requestUrl, currentLocation, extractPosition } from './Location';

class CurrentTemp extends Component {
  state = ({
    city: "",
    temp: "",
    icon: null,
    isLoading: true,
  });

  async componentDidMount() {
    const faren = c => Math.round(c * (9 / 5) - 459.67);
    if (navigator.geolocation) {
      const position = await currentLocation();
      const { lat, lon } = extractPosition(position);
      const data = await fetch(requestUrl(lat, lon)).then(resp =>
        resp.json()
      );

      this.setState({
        city: data.city.name,
        temp: faren(data.list[0].main.temp),
        icon: data.list[0].weather[0].icon,
        isLoading: false,
      });
    } else {
      alert("Data not available.");
    }
  }

  render() {
    const { icon, temp, city, isLoading } = this.state;    
    if(isLoading) {
      return null;      
    } else {
      return (
        <div className="container">
          <p>Current Temperature in {city}:</p>
          <div>
            <div>            
              <div>
                <div className="temp">{temp}&deg;F</div>
              </div>
              <div>
                <img
                  src={`http://openweathermap.org/img/w/${icon}.png`}                
                  alt="weather"
                />
              </div>
            </div>
          </div>
        </div>
      );      
    }
  }
}

export default CurrentTemp;
