import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './styles/App.css';

// import Home from './components/Home';
import CurrentTemp from './components/CurrentTemp';
import WeeklyForecast from './components/WeeklyForecast';
import Error from './components/Error';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={CurrentTemp} />
            <Route path="/5-day-forecast" component={WeeklyForecast} />
            <Route component={Error} />
          </Switch>        
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
