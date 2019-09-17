import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import Input from 'antd/lib/input';
import Popover from 'antd/lib/popover';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button'
import { messageData } from '../../helpers/fakeData';
import sendIcon from '../../../../images/send_icon.png';
import ScrollToBottom from 'react-scroll-to-bottom';
import firebase from 'firebase';
import uuid from 'uuid/v1';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'


const Chatbox = props => {
  const [message, setMessage] = useState('');
  const [conversationList, setConversationList] = useState([]);

  useEffect(() => {
    const conversation = firebase.database()
      .ref()
      .child(`chat-box/${props.room}`);
    conversation.on('value', conversationSuccess, conversationError);
  }, []);

  const conversationSuccess = data => {

    if (data.val() != null) {

      setConversationList(Object.values(data.val()))
    }
  }
  const conversationError = data => {
    console.log('error', data)
  }
  const handleSend = () => {
    if (message !== "") {
      firebase.database()
        .ref()
        .child(`chat-box/${props.room}/${uuid()}`)
        .set({
          messageText: message,
          userId: props.user._id,
          firstName: props.user.firstName,
          lastName: props.user.lastName,
          logo: props.user.logo || 'https://icon-library.net/images/no-user-image-icon/no-user-image-icon-27.jpg',
          timestamp: firebase.database.ServerValue.TIMESTAMP
        })
        .then(() => {
          setMessage('')
          console.log('nice')
        });
    }

  }
  const handleMessage = e => {
    setMessage(e.target.value)
  }
  const emojiClick = e => {
    setMessage(message + e.native)
  }
  console.log(props.user, 'props.user')
  return (
    <section className="chatbox-section">
      <h1 className="title">
        <Icon type="mail" /> CHATBOX
    </h1>
      <div className="content">
        <ScrollToBottom className="message-container">
          {conversationList.map(item => {
            const isFromUser = item.userId === props.user._id;
            return (
              <div
                className={classnames('message-item', {
                  'message-item-user': isFromUser,
                })}
              >
                <div
                  className={classnames('message', {
                    'message-user': isFromUser,
                  })}
                >
                  {item.messageText}
                </div>
                <div className="sent-details">
                  <span className="sender-name">
                    {!isFromUser && item.firstName}
                  </span>
                  {/* <span className="time"> {item.timestamp}</span> */}
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
        <div className="input-text-container">
          <Input.TextArea
            className="input-text"
            placeholder="Type a message..."
            value={message}
            onChange={handleMessage}
          />
          <Popover placement="topRight" content={<Picker onSelect={emojiClick} />} trigger="click">
            <Button>TL</Button>
          </Popover>
          <Button onClick={handleSend} className="send-button">
            <img src={sendIcon} alt="send" className="send-icon" />
          </Button>
        </div>
      </div>
    </section>
  )

}


export default Chatbox;
