/* eslint-disable react/no-unused-state */
/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { callUPS } from '../actions';
import NavBar from './NavBar';

class Home extends Component {
    ups = () => {
      this.props.callUPS('1Z5338FF0107231059');
    }

    render() {
      return (
        <div className="homepage-outer">
          <NavBar />
          <div className="hello">Hello!</div>
          <button className="button" type="button" onClick={this.ups}>UPS</button>
        </div>
      );
    }
}

function mapStateToProps(reduxState) {
  return {
    name: reduxState.user.name,
  };
}

export default connect(mapStateToProps, { callUPS })(Home);
