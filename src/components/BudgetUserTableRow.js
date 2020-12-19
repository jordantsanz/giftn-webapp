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
    this.props.person.giftInfo.push({ giftName: 'key', price: 200 });
  }

  renderGifts = () => {
    return this.props.person.giftInfo.map((giftInfo) => {
      console.log(giftInfo);
      return (
        <tr>
          <td>{giftInfo.giftName}</td>
          <td>{giftInfo.price}</td>
          <td>pic</td>
          <td><input className="uk-checkbox" type="checkbox" /></td>
        </tr>
      );
    });
  }

  render() {
    return [
      <tr key="main" onClick={this.toggleExpander}>
        <td>{this.props.person.name}</td>
        <td className="uk-text-nowrap">{this.calculateTotal()}</td>
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
