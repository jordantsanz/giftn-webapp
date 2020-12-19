/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-string-refs */
import React from 'react';
import { slideDown, slideUp } from './anim';
import '../style.scss';

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

  renderGifts = () => {
    return this.props.row.giftInfo.map((giftInfo) => {
      console.log(giftInfo);
      return (
        <tr id={giftInfo.id}>
          <td>{giftInfo.giftName}</td>
          <td>{giftInfo.price}</td>
          <td>pic</td>
          <td>
            <button className="button"
              id="delete"
              type="button"
              onClick={(e) => {
                this.clickMe(e, giftInfo.id);
              }}
            >
              Delete Gift
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return [
      <tr key="main" onClick={this.toggleExpander}>
        <td>{this.props.row.number}</td>
        <td className="uk-text-nowrap">{this.props.row.friend}</td>
        {/* <td><img className="uk-preserve-width uk-border-circle" src={user.picture.thumbnail} width={48} alt="avatar" /></td> */}
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

export default TrackingUserTableRow;
