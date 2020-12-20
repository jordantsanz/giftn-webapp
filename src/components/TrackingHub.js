import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrackingTable from './TrackingTable';
import NavBar from './NavBar';
import lightgreen from '../../images/lightgreen.png';

class TrackingHub extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="background">
        <img alt="background" className="page-holder" id="tracking-hub-page-holder" src={lightgreen} />
        <NavBar />
        <div className="title-pink">Your Packages</div>
        <TrackingTable numbers={this.props.user.trackingNumbers} />
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    user: reduxState.user,
  };
}

export default connect(mapStateToProps, null)(TrackingHub);
