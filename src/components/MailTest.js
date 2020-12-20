/* eslint-disable react/style-prop-object */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class MailTest extends Component {
  render() {
    return (
      <div className="email-outer">
        <div className="top-section">
          <div className="logo-white">Giftn </div>
        </div>
        <div className="top-border">
          <div className="blue-div" />
          <div className="blue-div" />
        </div>
        <div className="green-div">
          <div className="email-title">You&apos;ve got a package coming!</div>
          <div className="pink-box">
            <div className="to-box"> To: to-name </div>
            <div className="from-box"> From: from-name </div>
            <div className="message-box" />
          </div>
          <div className="tracking-number-box" />
        </div>
        <div className="bottom-border">
          <div className="blue-div" />
          <div className="blue-div" />
        </div>
        <div className="yellow-box">
          <div className="thanks-button">Say Thanks</div>
          <div className="sign-up-button">Sign up for giftn</div>
        </div>
        <div className="logo-black">giftn</div>
        <div className="border-bottom">
          <div className="yellow-div" />
          <div className="yellow-div" />
        </div>
      </div>
    );
  }
}

export default MailTest;
