import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrackingTable from './TrackingTable';
import NavBar from './NavBar';

class TrackingHub extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="page-holder" id="tracking-hub-page-holder">
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
