/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class ChooseBudget extends Component {
  render() {
    return (
      <div className="page-holder-outer">
        <div className="page-upper">
          <div className="logo-home">giftn</div>
        </div>
        <div className="budget-center">
          <div className="title-blue">Your Budget</div>
          <div className="budget-subtitle-1">Let&apos;s talk $$$$$$$...</div>
          <div className="budget-subtitle-2">How much are you willing to spend on holiday shopping this year?</div>
          <div className="budget-box">
            <div className="budget-dollar-sign">$</div>
            <input className="budget-input" placeholder="1000" />
          </div>
          <button type="button" className="button-pink">I&apos;m ready to shop!</button>
        </div>
      </div>
    );
  }
}

export default ChooseBudget;
