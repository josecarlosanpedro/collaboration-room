import React, { Component } from 'react';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import Modal from 'antd/lib/modal';
import Radio from 'antd/lib/radio'
import { peopleData } from '../../helpers/fakeData';
import BackgroundImage from './background'

class Videos extends Component {
  state = {
    showModal: false,
    currentUser: {},
    backgroundModal: false,
    customBackground: ""
  };

  handleClickItem = user => {
    console.log(user);
    this.setState({ showModal: true, currentUser: user });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, currentUser: {} });
  };
  showBackgroundModal = () => {
    this.setState({backgroundModal: true})
  }
  closeBackgroundModal = () => {
    this.setState({backgroundModal: false})
  }
  handleCustomBackgroundChange = e => {
    this.setState({customBackground: e.target.value})
  }
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
          {this.props.role === "teacher" && 
          <div>
          <Radio.Group defaultValue="teacher" className="_spacer-bottom-sm " size="large">
            <Radio.Button value="teacher">Teacher</Radio.Button>
            <Radio.Button value="student">Student</Radio.Button>
          </Radio.Group>
          <div>
            <Button onClick={this.showBackgroundModal} size="large">
                Background
            </Button>
            <Modal
              className="modal-background"
              visible={this.state.backgroundModal}
              maskClosable={true}
              footer={null}
              onCancel={this.closeBackgroundModal}
            ><div>
              <div className="_spacer-bottom-sm">
                <Input onChange={this.handleCustomBackgroundChange} placeholder="Image Link" className="background-input" size="large"/>
                <Button onClick={() => this.props.handleBackground(this.state.customBackground) } className="background-btn" size="large">Set</Button>
              </div>
                {BackgroundImage.map(image => {
                  return (
                    <img onClick={() => this.props.handleBackground(image.url)} className="image-section" src={image.url} alt={image.title} />
                  )
                })}
              </div>
            </Modal>
          </div>
          </div>
          }
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
