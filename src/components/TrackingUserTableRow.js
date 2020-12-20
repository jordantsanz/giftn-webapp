/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-string-refs */
import React from 'react';
import '../style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { slideDown, slideUp } from './anim';
import { deleteTrackingNumber } from '../actions';

class TrackingUserTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      deleteModalOpen: false,
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

  // displays gifts when the row is expanded
  renderGifts = () => {
    console.log(this.props.row);
    return (
      <div className="gift-row-flex">
        <div className="gift-outer-2">
          <div className="gift-name">{this.props.row.note}</div>
        </div>
      </div>
    );
  }

  seeClassName = () => {
    if (this.props.row.trackingNumber == 'blankblankblank') {
      return 'blank-row';
    } else {
      return 'name-row';
    }
  }

  openDeleteModal = () => {
    this.setState({
      deleteModalOpen: true,
    });
  }

  closeDeleteModal = () => {
    this.setState({
      deleteModalOpen: false,
    });
  }

  deleteNumber = (e, row) => {
    console.log('deleting number', row);
    this.props.deleteTrackingNumber(this.props.user, row.trackingNumber);
    this.closeDeleteModal();
  }

  render() {
    return [
      <div className="name-row" key="main" onClick={this.toggleExpander}>
        <div className="name-cell">{this.props.row.trackingNumber}</div>
        <div>
          <Modal
            isOpen={this.state.deleteModalOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={this.closeDeleteModal}
            className="delete-number-modal"
            overlay="overlay"
            contentLabel="Delete a Tracking Number Confirmation"
          >
            <div className="modal-lower">
              <div className="delete-number-modal-subtitle">Are you sure you want to delete this tracking number?</div>
              <button className="button-yes"
                onClick={(e) => {
                  this.deleteNumber(e, this.props.row);
                }}
                type="button"
              >Yes
              </button>
              <button className="button-no" onClick={this.closeDeleteModal} type="button">No</button>
            </div>
          </Modal>
        </div>
        <div className="friend-cell">{this.props.row.person}</div>
        {/* <td><img className="uk-preserve-width uk-border-circle" src={user.picture.thumbnail} width={48} alt="avatar" /></td> */}
        <div className="buttons-cell">
          <FontAwesomeIcon icon={faTrash}
            className="trash"
            onClick={(e) => {
              this.openDeleteModal(e);
            }}
          />
          <div className="checkbox-div">
            <label className="container" name="checkbox">
              <input
                type="checkbox"
                onChange={(e) => {
                  this.clickMe(e, this.props.row.id);
                }}
              />
              <span className="checkmark checkmark-white" />
            </label>
          </div>
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
  deleteTrackingNumber,
})(TrackingUserTableRow);
