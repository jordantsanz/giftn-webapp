/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';
import uuid from 'react-uuid';
import $ from 'jquery';
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
      addingGift: false,
    };
  }

  addPersonReveal = () => {
    this.setState((prevState) => {
      return {
        addingPerson: !prevState.addingPerson,
      };
    });
  }

  addGiftReveal = () => {
    this.setState((prevState) => {
      return {
        addingGift: !prevState.addingGift,
      };
    });
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
  }

  submitGift = () => {
    let id = '';
    const rightPerson = $('#dropdown-add-gift').val();
    for (let i = 0; i < this.props.user.people.length; i++) {
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
  }

  addPersonSectionRender = () => {
    if (this.state.addingPerson) {
      return (
        <div className="adding-person-revealed">
          <input type="input" placeholder="person" onChange={this.grabName} />
          <input type="input" placeholder="gift" onChange={this.grabGift} />
          <input type="input" placeholder="price" onChange={this.grabPrice} />
          <input type="input" placeholder="link (optional)" onChange={this.grabLink} />
          <button type="button" onClick={this.submitPerson}> Add person! </button>
        </div>
      );
    } else {
      return (
        <div className="blank" />
      );
    }
  }

  peopleOptions = () => {
    return this.props.user.people.map((person) => {
      return <option key={person.name} value={person.name}>{person.name}</option>;
    });
  }

  addGiftSectionRender = () => {
    if (this.state.addingGift) {
      return (
        <div className="adding-gift-revealed">
          <input type="input" placeholder="gift name" onChange={this.grabGift} />
          <input type="input" placeholder="price" onChange={this.grabPrice} />
          <input type="input" placeholder="link (optional)" onChange={this.grabLink} />
          <select type="select" id="dropdown-add-gift">
            {this.props.user.people.map((person) => {
              return <option key={person.name} value={person.name}>{person.name}</option>;
            })}
          </select>
          <button type="button" onClick={this.submitGift}>Add gift!</button>
        </div>
      );
    } else {
      return <div className="blank" />;
    }
  }

  render() {
    return (
      <div>
        <div className="table-container">
          <div className="button-long-div">
            <div className="button-holder-table">
              <button className="button" id="add-person-button" type="button" onClick={this.addPersonReveal}>Add Person</button>
              <button className="button" id="add-gift-button" type="button" onClick={this.addGiftReveal}>Add Gift</button>
            </div>
          </div>
          <div className="table-holder">
            {this.props.people.map((person) => <BudgetUserTableRow person={person} />)}
          </div>
          {this.addPersonSectionRender()}
          {this.addGiftSectionRender()}
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
