/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-string-refs */
import React from 'react';
import '../style.scss';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { slideDown, slideUp } from './anim';
import {
  deletePerson, buyGift, wishlistGift, deleteGiftFromPerson,
} from '../actions';

class BudgetUserTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      deletePersonModal: false,
      deleteGiftModal: false,
      giftToBeDeleted: '',
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
      total += parseInt(giftInfo[i].price, 10);
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

    console.log('checked? ', e.target.checked);
    const giftInfo = giftArray;
    for (let i = 0; i < giftInfo.length; i++) {
      if (giftInfo[i].id == id) {
        // if now checked:
        if (e.target.checked) {
          console.log('buy gift called');
          this.props.buyGift(this.props.user, this.props.person.id, giftInfo[i]);
          this.props.reload();
        } else { // if now unchecked
          console.log('wishlist gift called');
          this.props.wishlistGift(this.props.user, this.props.person.id, giftInfo[i]);
          this.props.reload();
        }
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
              <div className="gift-name">{giftInfo.giftName} {giftInfo.giftAvailability}</div>
            </div>
            <div className="gift-price">${giftInfo.price}</div>
            <div className="button-cell">
              <FontAwesomeIcon icon={faTrash}
                className="trash-red"
                id="deletebutton-gift"
                onClick={(e) => {
                  this.openDeleteGiftModal(giftInfo.id);
                }}
              />
              <div className="checkbox-div">
                <label className="container" name="checkbox">
                  <input
                    type="checkbox"
                    checked={giftInfo.bought}
                    onChange={(e) => {
                      this.checkStatus(e, giftInfo.id);
                    }}
                  />
                  <span className="checkmark checkmark-black" />
                </label>
              </div>
            </div>
          </div>
        );
      });
    };

    // <input className="checkbox"
    //             type="checkbox"
    //             checked={giftInfo.bought}
    //             onChange={(e) => {
    //               this.checkStatus(e, giftInfo.id);
    //             }}
    //           />

  deleteThePerson = (e, personId) => {
    console.log('outsdie delete');
    console.log('personId', personId);
    this.props.deletePerson(this.props.user, personId);
    this.closeDeletePersonModal();
    this.props.reload();
  }

  openDeletePersonModal = () => {
    this.setState({
      deletePersonModal: true,
    });
  }

  closeDeletePersonModal = () => {
    this.setState({
      deletePersonModal: false,
    });
  }

  openDeleteGiftModal = (giftId) => {
    this.setState({
      giftToBeDeleted: giftId,
      deleteGiftModal: true,
    });
  }

  closeDeleteGiftModal = () => {
    this.setState({
      deleteGiftModal: false,
    });
  }

  deleteGift = (e, personId) => {
    console.log('deleting gift');
    console.log('gift in budget: ', this.state.giftToBeDeleted);
    this.props.deleteGiftFromPerson(this.props.user, personId, this.state.giftToBeDeleted);
    this.closeDeleteGiftModal();
    this.setState({
      giftToBeDeleted: '',
    });
    this.props.reload();
  }

  // renders the component
  render() {
    return [
      <div className="name-row" key="main" onClick={this.toggleExpander}>
        <Modal
          isOpen={this.state.deletePersonModal}
            // onAfterOpen={afterOpenModal}
          onRequestClose={this.closeDeletePersonModal}
          className="delete-number-modal"
          overlay="overlay"
          contentLabel="Delete a Person Confirmation"
        >
          <div className="modal-lower">
            <div className="delete-number-modal-subtitle">Are you sure you want to delete this person?</div>
            <button className="button-yes"
              onClick={(e) => {
                this.deleteThePerson(e, this.props.person.id);
              }}
              type="button"
            >Yes
            </button>
            <button className="button-no" onClick={this.closeDeletePersonModal} type="button">No</button>
          </div>
        </Modal>
        <Modal
          isOpen={this.state.deleteGiftModal}
            // onAfterOpen={afterOpenModal}
          onRequestClose={this.closeDeleteGiftModal}
          className="delete-number-modal"
          overlay="overlay"
          contentLabel="Delete a Tracking Number Confirmation"
        >
          <div className="modal-lower">
            <div className="delete-number-modal-subtitle">Are you sure you want to delete this gift?</div>
            <button className="button-yes"
              onClick={(e) => {
                this.deleteGift(e, this.props.person.id);
              }}
              type="button"
            >Yes
            </button>
            <button className="button-no" onClick={this.closeDeleteGiftModal} type="button">No</button>
          </div>
        </Modal>
        <div className="name-cell">{this.props.person.name}</div>
        <div className="total-cell">{this.calculateTotal()}</div>
        <div className="buttons-cell">
          <FontAwesomeIcon icon={faTrash}
            className="trash"
            id="deletebutton"
            onClick={(e) => {
              this.openDeletePersonModal(e);
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

export default connect(mapStateToProps, {
  deletePerson, buyGift, wishlistGift, deleteGiftFromPerson,
})(BudgetUserTableRow);
