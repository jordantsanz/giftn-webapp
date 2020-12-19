/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';
import TrackingUserTableRow from './TrackingUserTableRow';

class TrackingTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addingNumber: false,
      number: '',
    };
  }

  addNumberReveal = () => {
    this.setState((prevState) => {
      return {
        addingNumber: !prevState.addingNumber,
      };
    });
  }

  grabNumber = (e) => {
    this.setState({
      number: e.target.value,
    });
  }

  submitNumber = () => {
    this.props.numbers.push({
      number: this.state.number,
      friend: '',
      status: '',
    });
  }

  addNumberSectionRender = () => {
    if (this.state.addingNumber) {
      return (
        <div className="adding-person-revealed">
          <input type="input" placeholder="person" onChange={this.grabNumber} />
          <button type="button" onClick={this.submitNumber}> Add number! </button>
        </div>
      );
    } else {
      return (
        <div className="blank" />
      );
    }
  }

  render() {
    return (
      <div>
        <div className="table-container">
          <div className="button-long-div">
            <div className="button-holder-table">
              <button className="button" id="send-email-button" type="button">Send Email</button>
              <button className="button" id="add-tracking-button" type="button">Add Tracking Number</button>
            </div>
          </div>
          <div className="table-holder">
            {this.props.numbers.map((row) => <TrackingUserTableRow row={row} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default TrackingTable;
