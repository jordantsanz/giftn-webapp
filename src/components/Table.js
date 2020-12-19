/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';
import UserTableRow from './UserTableRow';

class Table extends Component {
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
    const isLoading = this.props.people === null;
    console.log(this.props.people);
    return (
      <main>
        <div className="table-container">
          <div className="uk-overflow-auto">
            <table className="table-main">
              <thead className="left-align">
                <tr>
                  <th className="uk-table-shrink">Name</th>
                  <th>Total</th>
                  <th />
                  <th className="uk-table-shrink" />
                </tr>
              </thead>
              <tbody className="left-align">
                {isLoading
                  ? <tr><td colSpan={6} className="uk-text-center"><em className="uk-text-muted">Loading...</em></td></tr>
                  : this.props.people.map((person) => <UserTableRow person={person} />)}
              </tbody>
            </table>
          </div>
        </div>
        <div className="add-people-section">
          <button className="button" type="button" onClick={this.addPersonReveal}>Add person</button>
          {this.addPersonSectionRender()}
        </div>
      </main>
    );
  }
}

export default Table;
