/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';
import BudgetUserTableRow from './BudgetUserTableRow';

class BudgetTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addingPerson: false,
      person: '',
    };
  }

  addPersonReveal = () => {
    this.setState((prevState) => {
      return {
        addingPerson: !prevState.addingPerson,
      };
    });
  }

  grabName = (e) => {
    this.setState({
      person: e.target.value,
    });
  }

  submitPerson = () => {
    this.props.people.push({
      name: this.state.person,
      giftInfo: [{
        giftName: 'bitch',
        price: 200,
      }],
    });
  }

  addPersonSectionRender = () => {
    if (this.state.addingPerson) {
      return (
        <div className="adding-person-revealed">
          <input type="input" placeholder="person" onChange={this.grabName} />
          <button type="button" onClick={this.submitPerson}> Add person! </button>
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
              <button className="button" id="add-person-button" type="button">Add Person</button>
              <button className="button" id="add-gift-button" type="button">Add Gift</button>
            </div>
          </div>
          <div className="table-holder">
            {this.props.people.map((person) => <BudgetUserTableRow person={person} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default BudgetTable;
