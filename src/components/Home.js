/* eslint-disable react/no-unused-state */
/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { callUPS } from '../actions';
import Login from './Login';

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

    changePage = () => {
      console.log('hello');
      console.log(this.state.clicked);
      if (this.props.name != undefined && this.state.clicked) {
        console.log('we in');
      }
    }

    componentDidUpdate = () => {
      this.changePage();
    }

    clickedButton = () => {
      console.log('what');
      this.setState({
        clicked: true,
      });
      this.props.history.push('/chooseBudget');
    }

    render() {
      return (
        <div className="page-holder">
          <div className="page-upper">
            <div className="logo-home">giftn</div>
          </div>
          <div className="home-center-section">
            <div className="home-center-left">
              <div className="home-title">This pandemic&apos;s stressful enough without holiday shopping...</div>
              <div className="home-subtitle-1">Easily track your gift lists, budgeting, and package deliveries.</div>
              <div className="home-subtitle-2">A COVID-Holiday is a breeze with giftn.</div>
              <NavLink to="/choosebudget">
                <Login class="login-button-home" text="Login with Google" fromHome history={this.props.history} />
              </NavLink>
            </div>
            <img alt="holiday tree" className="home-center-right" />
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
