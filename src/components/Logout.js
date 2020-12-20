/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-this-in-sfc */
import React, { Component } from 'react';
import { GoogleLogout } from 'react-google-login';
import { connect } from 'react-redux';
import { logOutUser } from '../actions';

const clientId = '378735924994-knhso2dtafl79msh19jbl9d3hvfuut9h.apps.googleusercontent.com';

class Logout extends Component {
  render() {
    return (
      <div>
        <GoogleLogout
          render={(renderProps) => (
            <div type="button" className="transparent red nav-item" role="button" onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign out</div>
          )}
          clientId={clientId}
          buttonText="Logout"
          className="button-dark"
          onLogoutSuccess={this.props.logOutUser}
        />
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    user: reduxState.user,
  };
}
export default connect(mapStateToProps, { logOutUser })(Logout);
