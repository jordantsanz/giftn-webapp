/* eslint-disable no-return-assign */
/* eslint-disable react/no-unused-state */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';
import uuid from 'react-uuid';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import BudgetUserTableRow from './BudgetUserTableRow';
import { addGiftToPerson, addPerson } from '../actions';

class BudgetTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addingPerson: false,
      person: '',
      giftName: '',
      price: '',
      link: '',
      giftModal: false,
      personModal: false,
    };
  }

  grabName = (e) => {
    this.setState({
      person: e.target.value,
    });
  }

  grabGift = (e) => {
    this.setState({
      giftName: e.target.value,
    });
  }

  grabPrice = (e) => {
    this.setState({
      price: e.target.value,

    });
  }

  grabLink = (e) => {
    this.setState({
      link: e.target.value,
    });
  }

  submitPerson = () => {
    console.log(this.state.person);
    const person = {
      name: this.state.person,
      id: uuid(),
      giftInfo: {},
      // giftName: this.state.giftName,
      // price: parseInt(this.state.price, 10),
      // link: this.state.link,
      // bought: false,
      // id: uuid(),,
    };
    this.props.addPerson(this.props.user, person);
    this.setState({
      giftName: '',
      price: '',
      link: '',
      person: '',
      addingPerson: false,
    });
    $('input').val('');
    this.closePersonModal();
  }

  submitGift = () => {
    let id = '';
    const rightPerson = $('#dropdown-add-gift').val();
    for (let i = 0; i < this.props.user.people.length; i++) {
      console.log(this.props.user.people[i]);
      console.log('name', this.props.user.people[i].name);
      console.log('state', this.state.person);
      if (this.props.user.people[i].name == rightPerson) {
        id = this.props.user.people[i].id;
      }
    }
    const gift = {
      giftName: this.state.giftName,
      price: parseInt(this.state.price, 10),
      link: this.state.link,
      id: uuid(),
      bought: false,
    };

    this.props.addGiftToPerson(this.props.user, id, gift);

    this.setState({
      giftName: '',
      price: '',
      link: '',
      person: '',
      addingGift: '',
    });
    this.closeGiftModal();
  }

  peopleOptions = () => {
    return this.props.user.people.map((person) => {
      return <option key={person.name} value={person.name}>{person.name}</option>;
    });
  }

  openPersonModal = () => {
    this.setState({
      personModal: true,
    });
  }

  closePersonModal = () => {
    this.setState({
      personModal: false,
    });
  }

  openGiftModal = () => {
    this.setState({
      giftModal: true,

    });
  }

  closeGiftModal = () => {
    this.setState({
      giftModal: false,
    });
  }

  render() {
    return (
      <div>
        <div className="table-container">
          <div className="button-long-div">
            <div className="button-holder-table">
              <button className="button" id="add-person-button" type="button" onClick={this.openPersonModal}>Add Person</button>
              <button className="button" id="add-gift-button" type="button" onClick={this.openGiftModal}>Add Gift</button>
            </div>
          </div>
          <div className="table-holder">
            {this.props.people.map((person) => <BudgetUserTableRow person={person} />)}
          </div>
          <Modal
            isOpen={this.state.personModal}
            // onAfterOpen={afterOpenModal}
            onRequestClose={this.closePersonModal}
            className="Modal modal add-person-modal"
            overlay="overlay"
            contentLabel="Add a Tracking Number"
          >
            <div className="modal-top">
              <FontAwesomeIcon className="modal-x" id="yellow-x" role="button" onClick={this.closePersonModal} icon={faTimes} />
            </div>
            <div className="title-pink-modal">Add Person</div>
            <div className="subtitle-modal-addperson">Add a person to your Gift List to start buying their gifts.</div>
            <div className="adding-person-section">
              <input type="input" placeholder="Name" className="person-modal-input" onChange={this.grabName} />
              <input type="input" placeholder="Email" className="person-modal-input" /> {/* Email grab on person? */}
              <button type="button" className="button-adding-person" onClick={this.submitPerson}> Add to my list </button>
            </div>
          </Modal>
          <Modal
            isOpen={this.state.giftModal}
            // onAfterOpen={afterOpenModal}
            onRequestClose={this.closeGiftModal}
            className="Modal modal add-gift-modal"
            overlay="overlay"
            contentLabel="Add a Tracking Number"
          >
            <div className="modal-top">
              <FontAwesomeIcon className="modal-x" id="black-x" role="button" onClick={this.closeGiftModal} icon={faTimes} />
            </div>
            <div className="title-yellow-modal">Add Gift</div>
            <div className="subtitle-modal-addgift">Add a gift from Amazon for a person on your Gift List.</div>
            <div className="adding-gift-revealed">
              <input type="input" className="add-gift-input" placeholder="Amazon Link" onChange={this.grabLink} />
              <input type="input" className="add-gift-input" placeholder="Name (optional)" onChange={this.grabGift} />
              <input type="input"
                className="add-gift-input"
                placeholder="Price"
                onChange={this.grabPrice}
              />
              <select type="select" className="add-gift-input" placeholder="Person" id="dropdown-add-gift">
                {this.props.user.people.map((person) => {
                  return <option key={person.name} value={person.name}>{person.name}</option>;
                })}
              </select>
              <button type="button" className="add-gift-button" onClick={this.submitGift}>Add to my list</button>
            </div>
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

export default connect(mapStateToProps, { addGiftToPerson, addPerson })(BudgetTable);
