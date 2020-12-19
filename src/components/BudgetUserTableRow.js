/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-string-refs */
import React from 'react';
import { slideDown, slideUp } from './anim';
import '../style.scss';

class BudgetUserTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  calculateTotal = () => {
    const { giftInfo } = this.props.person;
    let total = 0;

    for (let i = 0; i < giftInfo.length; i++) {
      total += giftInfo[i].price;
    }

    return (
      <div className="total">{total}</div>
    );
  }

  // checks the status of a checkbox to see if it has been updated to bought
  checkStatus = (e, id) => {
    for (let i = 0; i < this.props.person.giftInfo.length; i++) {
      if (this.props.person.giftInfo[i] == id) {
        if (e.target.checked) {
          this.props.person.giftInfo[i].bought = true;
        } else {
          this.props.person.giftInfo[i].bought = false;
        }
        return; // need to send call to update in database
      }
    }
  }

  // expands a row when it is clicked on by calling the appropriate animation
  toggleExpander = (e) => {
    if (e.target.type === 'checkbox') return; // makes sure row is clicked

    if (e.target.type === 'button') { // if button is clicked
      // expands the row
      if (!this.state.expanded) {
        this.setState(
          { expanded: true },
          () => {
            if (this.refs.expanderBody) {
              slideDown(this.refs.expanderBody); // calls the animation
            }
          },
        );
      } else {
        return;
      }
    }
    // checks when other row click, not button click
    if (!this.state.expanded) {
      this.setState(
        { expanded: true },
        () => {
          if (this.refs.expanderBody) {
            slideDown(this.refs.expanderBody);
          }
        },
      );
      // unexpands the row
    } else {
      slideUp(this.refs.expanderBody, {
        onComplete: () => { this.setState({ expanded: false }); },
      });
    }
  }

  // fired when add gift button clicked; adds a gift to the gift array
  addGift = () => {
    this.props.person.giftInfo.push({
      id: 2000, giftName: 'key', price: 200, bought: false,
    });
  }

  // displays gifts when the row is expanded
  renderGifts = () => {
    return this.props.person.giftInfo.map((giftInfo) => {
      console.log(giftInfo);
      return (
        <tr>
          <td>{giftInfo.giftName}</td>
          <td>{giftInfo.price}</td>
          <td>pic</td>
          <td><input className="uk-checkbox"
            type="checkbox"
            checked={giftInfo.bought}
            onChange={(e) => {
              this.clickMe(e, giftInfo.id);
            }}
          />
          </td>
        </tr>
      );
    });
  }

  // renders the component
  render() {
    return [
      <tr key="main" onClick={this.toggleExpander}>
        <td>{this.props.person.name}</td>
        <td className="uk-text-nowrap">{this.calculateTotal()}</td>
        <td>
          <button type="button" onClick={this.addGift}>Add gift</button>
        </td>
      </tr>,
      this.state.expanded && (
        <tr className="expandable" key="tr-expander">
          <td className="uk-background-muted" colSpan={6}>
            <div ref="expanderBody" className="inner table-main">
              <table className="table-main">
                <thead className="inner-table" id="inner-table-head">
                  <tr>
                    <th>Gift Name</th>
                    <th>Price</th>
                    <th>Picture</th>
                    <th>Bought?</th>
                  </tr>
                </thead>
                <tbody className="inner-table" id="inner-table-body">
                  {this.renderGifts()}
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      ),
    ];
  }
}

export default BudgetUserTableRow;
