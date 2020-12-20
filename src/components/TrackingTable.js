/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable eqeqeq */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-modal';
import $ from 'jquery';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import TrackingUserTableRow from './TrackingUserTableRow';
import { addTrackingNumber, sendEmail } from '../actions';

class TrackingTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addingNumber: false,
      trackingNumber: '',
      note: '',
      addNumberModalIsOpen: false,
      emailModal: false,
      email: '',
    };
  }

  onInputChangeEmail = (event) => {
    console.log(event.target.value);
    this.setState({ email: event.target.value });
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

    this.closeAddNumberModal();
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
    return numberArray;
  }

  openEmailModal = () => {
    this.setState({
      emailModal: true,
    });
  }

  closeEmailModal = () => {
    this.setState({
      emailModal: false,
    });
  }

  sendEmail = () => {
    let found = '';
    const toName = $('#dropdown-email').val();
    for (const [key, value] of Object.entries(this.props.user.trackingNumbers)) {
      const trackingNum = key;
      const trackingObj = value;
      if (trackingObj.person === toName) {
        found = trackingNum;
      }
    }
    const emailObject = {
      toAddress: this.state.email,
      toName,
      fromName: this.props.user.name,
      trackingNumber: found,
    };
    this.props.sendEmail(emailObject);
    this.closeEmailModal();
  }

  render() {
    return (
      <div>
        <div className="table-container">
          <div className="button-long-div">
            <div className="button-holder-table">
              <button className="button" id="send-email-button" onClick={this.openEmailModal} type="button">Send Email</button>
              <button onClick={this.openAddNumberModal} className="button" id="add-tracking-button" type="button">Add Tracking Number</button>
            </div>
          </div>
          <div className="table-holder">
            {this.makeArray().map((row) => <TrackingUserTableRow row={row} />)}
          </div>
        </div>

        {/* TRACKING NUMBER MODAL */}
        <div>
          <Modal
            isOpen={this.state.addNumberModalIsOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={this.closeAddNumberModal}
            className="modal add-number-modal"
            overlay="overlay"
            contentLabel="Add a Tracking Number"
          >
            <div className="modal-top">
              <FontAwesomeIcon className="modal-x" id="black-x" role="button" onClick={this.closeAddNumberModal} icon={faTimes} />
            </div>
            <div className="title-blue-modal">Add Tracking Number</div>
            <div className="subtitle-modal-addnumber">Add a tracking number to your package tracker table.</div>
            <select className="modal-dropdown" id="carrier">
              <option>FedEx</option>
              <option>UPS</option>
              <option>USPS</option>
              <option>Other</option>
            </select>
            <input autoComplete="off" className="tracking-number-input" placeholder="Tracking Number" onChange={this.grabNumber} />
            <input autoComplete="off" className="note-input" placeholder="Purchase Description" onChange={this.grabNote} />
            <select className="modal-dropdown" type="select" id="dropdown">
              {this.props.user.people.map((person) => {
                return <option key={person.name} value={person.name}>{person.name}</option>;
              })}
            </select>
            <button type="button" className="add-number-modal-submit" onClick={this.submitNumber}>Add to my list</button>
          </Modal>

          {/* EMAIL MODAL */}
          <Modal
            isOpen={this.state.emailModal}
            // onAfterOpen={afterOpenModal}
            onRequestClose={this.closeAddNumberModal}
            className="email-modal"
            overlay="overlay"
            contentLabel="Email a Friend"
          >
            <div className="modal-top">
              <FontAwesomeIcon className="modal-x" id="yellow-x" role="button" onClick={this.closeEmailModal} icon={faTimes} />
            </div>
            <div className="title-black-modal">Send Email</div>
            <div className="subtitle-modal-addnumber">Pick a person on your Gift List to send this email.</div>
            <select type="select" id="dropdown-email" onChange={this.onInputChangeToName}>
              {this.props.user.people.map((person) => {
                return <option key={person.name} value={person.name}>{person.name}</option>;
              })}
            </select>
            <div>
              <input type="text" id="email" className="note-input" placeholder="Email" name="email" onChange={this.onInputChangeEmail} />
            </div>
            <button type="button" className="email-modal-submit" onClick={this.sendEmail}>Send email</button>
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

export default connect(mapStateToProps, { addTrackingNumber, sendEmail })(TrackingTable);
