/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable eqeqeq */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import $ from 'jquery';
import TrackingUserTableRow from './TrackingUserTableRow';
import { addTrackingNumber } from '../actions';

class TrackingTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addingNumber: false,
      trackingNumber: '',
      note: '',
      addNumberModalIsOpen: false,
    };
  }

  switchStateAddNumber = () => {
    this.setState((prevState) => {
      return {
        addingNumber: !prevState.addingNumber,
      };
    });
  }

  grabNumber = (e) => {
    this.setState({
      trackingNumber: e.target.value,
    });
  }

  grabNote = (e) => {
    this.setState({
      note: e.target.value,
    });
  }

  submitNumber = () => {
    const trackingNumberObject = {
      trackingNumber: this.state.trackingNumber,
      note: this.state.note,
      person: $('#dropdown').val(),
    };
    this.props.addTrackingNumber(this.props.user, trackingNumberObject);

    this.setState({
      addingNumber: false,
      trackingNumber: '',
      note: '',
    });
  }

  openAddNumberModal = () => {
    this.setState({
      addNumberModalIsOpen: true,
    });
  }

  closeAddNumberModal = () => {
    this.setState({
      addNumberModalIsOpen: false,
    });
  }

  makeArray = () => {
    const numberArray = [];
    for (const [key, value] of Object.entries(this.props.user.trackingNumbers)) {
      const trackingNum = key;
      const trackingObj = value;
      numberArray.push({
        trackingNumber: trackingNum,
        note: trackingObj.note,
        person: trackingObj.person,
      });
    }
    if (numberArray.length == 1) {
      numberArray.push({
        trackingNumber: 'blankblankblank',
        note: '',
        person: '',
      });
    }
    return numberArray;
  }

  render() {
    return (
      <div>
        <div className="table-container">
          <div className="button-long-div">
            <div className="button-holder-table">
              <button className="button" id="send-email-button" type="button">Send Email</button>
              <button onClick={this.openAddNumberModal} className="button" id="add-tracking-button" type="button">Add Tracking Number</button>
            </div>
          </div>
          <div className="table-holder">
            {this.makeArray().map((row) => <TrackingUserTableRow row={row} />)}
          </div>
        </div>
        <div>
          <Modal
            isOpen={this.state.addNumberModalIsOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={this.closeAddNumberModal}
            className="add-number-modal"
            overlay="overlay"
            contentLabel="Add a Tracking Number"
          >
            <div className="modal-top">
              <div className="modal-x" role="button" onClick={this.closeAddNumberModal}>X</div>
            </div>
            <div className="title-blue-modal">Add Tracking Number</div>
            <div className="subtitle-modal-addnumber">Add a tracking number to your package tracker table.</div>
            <select className="modal-dropdown" id="carrier">
              <option>FedEx</option>
              <option>UPS</option>
              <option>USPS</option>
              <option>Other</option>
            </select>
            <input className="tracking-number-input" placeholder="Tracking Number" onChange={this.grabNumber} />
            <input className="note-input" placeholder="Purchase Description" onChange={this.grabNote} />
            <select type="select" id="dropdown">
              {this.props.user.people.map((person) => {
                return <option key={person.name} value={person.name}>{person.name}</option>;
              })}
            </select>
            <button type="button" className="add-number-modal-submit" onClick={this.submitNumber}>Add to my list</button>
          </Modal>
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    user: reduxState.user,
  };
}

export default connect(mapStateToProps, { addTrackingNumber })(TrackingTable);
