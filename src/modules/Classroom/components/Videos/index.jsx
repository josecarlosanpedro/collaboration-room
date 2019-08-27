import React, { Component } from 'react';
import Icon from 'antd/lib/icon';
import Modal from 'antd/lib/modal';
import { peopleData } from '../../helpers/fakeData';

class Videos extends Component {
  state = {
    showModal: false,
    currentUser: {},
  };

  handleClickItem = user => {
    console.log(user);
    this.setState({ showModal: true, currentUser: user });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, currentUser: {} });
  };

  render() {
    const { showModal, currentUser } = this.state;
    const displayModalTitle = (
      <span>
        <Icon type="user" className="fullname-icon" />
        {currentUser.firstName} {currentUser.lastName}
      </span>
    );
    return (
      <>
        <section className="videos-section">
          <h1 className="title">
            <Icon type="team" /> PEOPLE
          </h1>
          <div className="content">
            {peopleData.map(user => (
              <div
                className="item-user"
                key={user.id}
                onClick={() => this.handleClickItem(user)}
              >
                <div className="user-video">
                  <Icon type="video-camera" className="video-icon" />
                </div>
                <span className="user-fullname">
                  <Icon type="user" className="fullname-icon" />
                  {user.firstName} {user.lastName}
                </span>
              </div>
            ))}
          </div>
        </section>
        <Modal
          className="modal-user-video"
          getContainer={() => document.querySelector('.videos-section')}
          title={displayModalTitle}
          visible={showModal}
          onOk={this.handleCloseModal}
          maskClosable={false}
          footer={null}
          centered
          onCancel={this.handleCloseModal}
        >
          <div className="video-container">
            <Icon type="video-camera" className="video-icon" />
          </div>
        </Modal>
      </>
    );
  }
}

export default Videos;
