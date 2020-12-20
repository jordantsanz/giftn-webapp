/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-string-refs */
import React from 'react';
import '../style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { slideDown, slideUp } from './anim';
import { deletePerson, buyGift, wishlistGift } from '../actions';

class BudgetUserTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  calculateTotal = () => {
    const giftArray = [];
    for (const [key, value] of Object.entries(this.props.person.giftInfo)) {
      const giftId = key;
      const giftInfo = value;
      giftArray.push({
        id: giftId,
        giftName: giftInfo.giftName,
        price: giftInfo.price,
        link: giftInfo.link,
        bought: giftInfo.bought,
      });
    }
    const giftInfo = giftArray;
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
    const giftArray = [];
    for (const [key, value] of Object.entries(this.props.person.giftInfo)) {
      const giftId = key;
      const giftInfo = value;
      giftArray.push({
        id: giftId,
        giftName: giftInfo.giftName,
        price: giftInfo.price,
        link: giftInfo.link,
        bought: giftInfo.bought,
      });
    }
    const giftInfo = giftArray;
    for (let i = 0; i < giftInfo.length; i++) {
      if (giftInfo[i] == id) {
        if (e.target.checked) {
          this.props.buyGift(this.props.user, giftInfo[i]);
        } else {
          this.props.wishlistGift(this.props.user, giftInfo[i]);
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

  makeGiftArray = () => {
    const giftArray = [];
    for (const [key, value] of Object.entries(this.props.person.giftInfo)) {
      const giftId = key;
      const giftInfo = value;
      giftArray.push({
        id: giftId,
        giftName: giftInfo.giftName,
        price: giftInfo.price,
        link: giftInfo.link,
        bought: giftInfo.bought,
      });
    }
    return giftArray;
  }

    // displays gifts when the row is expanded
    renderGifts = () => {
      console.log(this.props.person.giftInfo);
      const giftArray = this.makeGiftArray();

      return giftArray.map((giftInfo) => {
        return (
          <div key={giftInfo.id} className="gift-row-flex">
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
    };

  deleteThePerson = (e, personId) => {
    console.log('outsdie delete');
    console.log('personId', personId);
    this.props.deletePerson(this.props.user, personId);
  }

  // renders the component
  render() {
    return [
      <div className="name-row" key="main" onClick={this.toggleExpander}>
        <div className="name-cell">{this.props.person.name}</div>
        <div className="total-cell">{this.calculateTotal()}</div>
        <div className="buttons-cell">
          <FontAwesomeIcon icon={faTrash}
            className="trash"
            id="deletebutton"
            onClick={(e) => {
              this.deleteThePerson(e, this.props.person.id);
            }}
          />
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

function mapStateToProps(reduxState) {
  return {
    user: reduxState.user,
  };
}

export default connect(mapStateToProps, { deletePerson, buyGift, wishlistGift })(BudgetUserTableRow);
