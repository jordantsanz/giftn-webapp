/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-this-in-sfc */
import React, { Component } from 'react';
import { GoogleLogout } from 'react-google-login';
import { connect } from 'react-redux';
import { logOutUser } from '../actions';

const clientId = '1058585226378-dqi37pj4a7h6edcvnbma6pqbq1uk3dn0.apps.googleusercontent.com';

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
