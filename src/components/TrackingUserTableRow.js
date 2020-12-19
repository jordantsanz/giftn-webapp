/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-string-refs */
import React from 'react';

import '../style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { slideDown, slideUp } from './anim';

class TrackingUserTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  toggleExpander = (e) => {
    if (e.target.type === 'checkbox') return;

    if (e.target.type === 'button') {
      if (!this.state.expanded) {
        this.setState(
          { expanded: true },
          () => {
            if (this.refs.expanderBody) {
              slideDown(this.refs.expanderBody);
            }
          },
        );
      } else {
        return;
      }
    }

    if (!this.state.expanded) {
      this.setState(
        { expanded: true },
        () => {
          if (this.refs.expanderBody) {
            slideDown(this.refs.expanderBody);
          }
        },
      );
    } else {
      slideUp(this.refs.expanderBody, {
        onComplete: () => { this.setState({ expanded: false }); },
      });
    }
  }

  addGift = () => {
    this.props.row.giftInfo.push({ id: 2000, giftName: 'key', price: 200 });
  }

  deleteGift = (event, id) => {
    if (event.target.type == 'button') {
      for (let i = 0; i < this.props.row.giftInfo.length; i++) {
        if (id == this.props.row.giftInfo[i].id) {
          delete this.props.row.giftInfo[i];
        }
      }
    }
  }

  //   clickMe = (e, id) => {

  //   }

  // displays gifts when the row is expanded
  renderGifts = () => {
    return this.props.row.giftInfo.map((giftInfo) => {
      return (
        <div className="gift-row-flex">
          <div className="gift-outer">
            <div className="gift-pic">pic</div>
            <div className="gift-name">{giftInfo.giftName} {giftInfo.giftAvailability}</div>
          </div>
          <div className="gift-price">${giftInfo.price}</div>
          <div className="button-cell">
            <FontAwesomeIcon icon={faTrash} className="trash-red" />
            <div className="checkbox-div"><input className="uk-checkbox"
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

  render() {
    return [
      <div className="name-row" key="main" onClick={this.toggleExpander}>
        <div className="name-cell">{this.props.row.number}</div>
        <div className="friend-cell">{this.props.row.friend}</div>
        {/* <td><img className="uk-preserve-width uk-border-circle" src={user.picture.thumbnail} width={48} alt="avatar" /></td> */}
        <div className="buttons-cell">
          <FontAwesomeIcon icon={faTrash} className="trash" />
          <input className="checkbox"
            type="checkbox"
            onChange={(e) => {
              this.clickMe(e, this.props.row.id);
            }}
          />
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

export default TrackingUserTableRow;
