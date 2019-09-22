import React, { Component } from 'react';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
const { confirm } = Modal;

class Header extends Component {
  showConfirm = () => {
    confirm({
      title: 'Are you sure to leave the classroom?',
      content: 'You cannot go back again immediately.',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
      okText: 'Yes',
      cancelText: 'Cancel',
      getContainer: () => document.querySelector('.header-section'),
      className: 'leave-modal',
    });
  };

  render() {
    return (
      <section className="header-section">
        <Button className="leave-button" type="link" onClick={this.showConfirm}>
          Leave Classroom <Icon type="export" className="leave-icon" />
        </Button>

      </section >
    );
  }
}

export default Header;
