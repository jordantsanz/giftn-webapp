/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Login from './Login';
import Logout from './Logout';
import logoblack from '../../images/logoblack.png';

class NavBar extends Component {
    checkLog = () => {
      if (this.props.name != '') {
        return (
          <Logout />
        );
      } else {
        return (
          <Login class="transparent red nav-item" text="Sign in" />
        );
      }
    }

    render() {
      return (
        <div className="nav-holder">
          <NavLink to="/">
            <img src={logoblack} className="logo" alt="logo" />
          </NavLink>
          <div className="right-side">
            <NavLink to="/budget">
              <div className="nav-item white" id="gift-list">Gift list</div>
            </NavLink>
            <NavLink to="/tracking">
              <div className="nav-item white" id="package-tracker">Package tracker</div>
            </NavLink>
            {this.checkLog()}
          </div>
        </div>
      );
    }
}

function mapStateToProps(reduxState) {
  return {
    name: reduxState.user.name,
  };
}

export default connect(mapStateToProps, null)(NavBar);
