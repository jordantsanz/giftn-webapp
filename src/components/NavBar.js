/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import Logout from './Logout';

class NavBar extends Component {
    checkLog = () => {
      if (this.props.name != '') {
        return (
          <Logout />
        );
      } else {
        return (
          <Login />
        );
      }
    }

    render() {
      return (
        <div className="nav-holder">
          <div className="logo">logo </div>
          <div className="right-side">
            <div className="nav-item white" id="gift-list">Gift list</div>
            <div className="nav-item white" id="package-tracker">Package tracker</div>
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
