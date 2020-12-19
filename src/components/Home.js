/* eslint-disable eqeqeq */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import Logout from './Logout';

class Home extends Component {
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
        <div className="homepage-outer">
          <div className="hello">Hello!</div>
          {this.checkLog()}
        </div>
      );
    }
}

function mapStateToProps(reduxState) {
  return {
    name: reduxState.user.name,
  };
}

export default connect(mapStateToProps, null)(Home);
