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
    const isLoading = this.props.numbers === null;
    console.log(this.props.numbers);
    return (
      <main>
        <div className="table-container">
          <div className="uk-overflow-auto">
            <table className="table-main">
              <thead className="left-align">
                <tr>
                  <th className="uk-table-shrink">Tracking Number</th>
                  <th>Friend</th>
                  <th />
                  <th className="uk-table-shrink" />
                </tr>
              </thead>
              <tbody className="left-align">
                {isLoading
                  ? <tr><td colSpan={6} className="uk-text-center"><em className="uk-text-muted">Loading...</em></td></tr>
                  : this.props.numbers.map((row) => <TrackingUserTableRow row={row} />)}
              </tbody>
            </table>
          </div>
        </div>
        <div className="add-people-section">
          <button className="button" type="button" onClick={this.addNumberReveal}>Add Number</button>
          {this.addNumberSectionRender()}
        </div>
      </main>
    );
  }
}

export default TrackingTable;
