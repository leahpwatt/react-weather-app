import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <NavLink exact onClick={() => this.closeMenu()} to="/">Home</NavLink>
        <NavLink onClick={() => this.closeMenu()} to="/5-day-forecast">5 Day Forecast</NavLink>
      </div>
    )
  }
};

export default Header;