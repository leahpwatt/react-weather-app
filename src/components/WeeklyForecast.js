import React, { Component } from 'react';
import { requestUrl, currentLocation, extractPosition } from './Location';
import { Grid } from 'semantic-ui-react';
import moment from 'moment';

class WeeklyForecast extends Component {
  state = ({
    city: "",
    items: [],    
    isLoading: true,
  });

  async componentDidMount() {    
    if (navigator.geolocation) {
      const position = await currentLocation();
      const { lat, lon } = extractPosition(position);
      const data = await fetch(requestUrl(lat, lon)).then(resp =>
        resp.json()
      );

      this.setState({
        city: data.city.name,
        items: data.list,   
        isLoading: false,     
      });      
    } else {
      alert("Data not available.");
    }
  }

  render() {    
    const { city, items } = this.state; 
    const faren = c => Math.round(c * (9 / 5) - 459.67);      
    const item = items.map((item, index) => 
      <Grid key={index}
        stackable 
        columns={4} 
        celled='internally'>
        {(item.dt_txt).includes('15:00:00')
          ? <Grid.Row>
              <Grid.Column>          
                <p>{moment(item.dt_txt).format("MM-DD-YYYY")}</p>                              
              </Grid.Column>          
              <Grid.Column>
                <p>{faren(item.main.temp_min)}&deg;F</p>
              </Grid.Column>
              <Grid.Column>
                <p>{faren(item.main.temp_max)}&deg;F</p>
              </Grid.Column>
              <Grid.Column>
                <img src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}                
                alt="weather" />          
              </Grid.Column>  
            </Grid.Row>
          : null
        }       
      </Grid>
    );       
    if(this.state.isLoading) {
      return null;
    } else {
      return (
        <div className="container">
          <p>5-Day Forecast for {city}:</p>    
          <div className='grid'>
            <Grid stackable 
              columns={4} 
              celled='internally'>
              <Grid.Row>
                <Grid.Column>
                  <h2>Date</h2>
                </Grid.Column>
                <Grid.Column>
                  <h2>Low</h2>                
                </Grid.Column>
                <Grid.Column>
                  <h2>High</h2>                
                </Grid.Column>
                <Grid.Column>
                  <h2>Weather</h2>                
                </Grid.Column>    
              </Grid.Row>         
            </Grid>        
            {item}
          </div>
        </div>
      );
    }
  }
}

export default WeeklyForecast;
