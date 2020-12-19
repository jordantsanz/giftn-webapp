/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-string-refs */
import React from 'react';
import '../style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { slideDown, slideUp } from './anim';

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
      <div className="total">${total}</div>
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
      return (
        <div className="gift-row-flex">
          <div className="gift-outer">
            <div className="gift-pic">pic</div>
            <div className="gift-name">{giftInfo.giftName} {giftInfo.giftAvailability}</div>
          </div>
          <div className="gift-price">${giftInfo.price}</div>
          <div className="button-cell">
            <FontAwesomeIcon icon={faTrash} className="trash-red" />
            <div className="checkbox-div"><input className="checkbox"
              type="checkbox"
              onChange={(e) => {
                this.clickMe(e, giftInfo.id);
              }}
            />
            </div>
          </div>
        </div>
      );
    });
  }

  // renders the component
  render() {
    return [
      <div className="name-row" key="main" onClick={this.toggleExpander}>
        <div className="name-cell">{this.props.person.name}</div>
        <div className="total-cell">{this.calculateTotal()}</div>
        <div className="buttons-cell">
          <FontAwesomeIcon icon={faTrash} className="trash" />
          <FontAwesomeIcon icon={faChevronDown} className="trash" />
        </div>
      </div>,
      this.state.expanded && (
        <div className="expandable" key="tr-expander">
          <div ref="expanderBody" className="inner table-main">
            <div className="inner-table" id="inner-table-body">
              {this.renderGifts()}
            </div>
          </div>
        </div>
      ),
    ];
  }
}

export default BudgetUserTableRow;
