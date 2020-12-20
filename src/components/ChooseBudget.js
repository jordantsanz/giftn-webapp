/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateBudget } from '../actions';
import red from '../../images/red.png';
import logowhite from '../../images/logowhite.png';

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

class ChooseBudget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: '',
    };
  }

  typeBudget = (e) => {
    this.setState({
      budget: e.target.value,
    });
    console.log(this.state.budget);
  }

    submitBudget = () => {
      const { budget } = this.state;
      console.log('submitting');
      if (budget != undefined && budget != null) {
        for (let i = 0; i < budget.length; i++) {
          if (isLetter(budget[i])) {
            console.log('is letter');
            // alert('Please enter in a valid budget.');
            return;
          }
        }
        console.log(this.props.user);
        this.props.updateBudget(this.props.user, this.state.budget);
        this.props.history.push('/budget');
      } else {
        this.props.history.push('/');
        // alert('Please enter in a valid budget');
      }
    }

    render() {
      return (
        <div className="background">
          <img src={red} alt="background" className="page-holder-outer" />
          <div className="page-upper">
            <img className="logo-home" src={logowhite} alt="logowhite" />
          </div>
          <div className="budget-center">
            <div className="choose-budget-top-stuff">
              <div className="title-blue">Your Budget</div>
              <div className="budget-subtitle-1">Let&apos;s talk $$$$$$$...</div>
              <div className="budget-subtitle-2">How much are you willing to spend on holiday shopping this year?</div>
            </div>
            <div className="budget-box">
              <div className="budget-dollar-sign">$</div>
              <input autoComplete="off" className="budget-input" id="budget-input" onChange={this.typeBudget} placeholder="1000" />
            </div>
            <button onClick={this.submitBudget} type="button" className="button-pink">I&apos;m ready to shop!</button>
          </div>
        </div>
      );
    }
}

function mapStateToProps(reduxState) {
  return {
    // address: reduxState.address,
    user: reduxState.user,
  };
}
export default connect(mapStateToProps, { updateBudget })(ChooseBudget);
