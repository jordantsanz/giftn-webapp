/* eslint-disable react/no-unused-state */
/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { callUPS } from '../actions';
import Login from './Login';
import green from '../../images/green.png';
import logowhite from '../../images/logowhite.png';
import animation from '../../images/animation.gif';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
  }

    ups = () => {
      this.props.callUPS('1Z5338FF0107231059');
    }

    updateClick = () => {
      console.log('click');
      this.setState({
        clicked: true,
      });
    }

    render() {
      return (
        <div className="background">
          <img className="page-holder" alt="background" src={green} />
          <div className="page-upper">
            <img alt="lgoo" className="logo-white" src={logowhite} />
          </div>
          <div className="home-center-section">
            <div className="home-center-left">
              <div className="home-title">This pandemic&apos;s stressful enough without holiday shopping...</div>
              <div className="home-subtitle-1">Easily track your gift lists, budgeting, and package deliveries.</div>
              <div className="home-subtitle-2">A COVID-Holiday is a breeze with giftn.</div>
              <NavLink to="/choosebudget" onClick={this.updateClick}>
                <Login class="login-button-home" text="Login with Google" fromHome history={this.props.history} clicked={this.state.clicked} />
              </NavLink>
            </div>
            <img alt="holiday tree" src={animation} className="home-center-right" />
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

export default connect(mapStateToProps, { callUPS })(Home);
