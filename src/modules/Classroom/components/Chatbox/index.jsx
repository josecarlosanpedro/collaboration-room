import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import Input from 'antd/lib/input';
import Popover from 'antd/lib/popover';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import sendIcon from '../../../../images/send_icon.png';
import ScrollToBottom from 'react-scroll-to-bottom';
import firebase from 'firebase';
import Modal from 'antd/lib/modal'
import uuid from 'uuid/v1';
import 'emoji-mart/css/emoji-mart.css';
import {GifChild, GifAdult, GifGroup} from './gifData';
import { Picker } from 'emoji-mart';

const Chatbox = props => {
  const [message, setMessage] = useState('');
  const [conversationList, setConversationList] = useState([]);
  const [emojiShow, setEmojiShow] = useState({
   state: false,
   url: ""
  });

  useEffect(() => {

    const conversation = firebase
      .database()
      .ref()
      .child(`chat-box/${props.room}`);
    conversation.on('value', conversationSuccess, conversationError);
  }, []);

  const conversationSuccess = data => {
    if (data.val() != null) {
      setConversationList(Object.values(data.val()));
    }
  };
  const conversationError = data => {
    console.log('error', data);
  };
  const handleSend = () => {
    console.log('message', message);
    if (message !== '') {
      firebase
        .database()
        .ref()
        .child(`chat-box/${props.room}/${uuid()}`)
        .set({
          messageText: message,
          userId: props.user._id,
          firstName: props.user.firstName,
          lastName: props.user.lastName,
          logo:
            props.user.logo ||
            'https://icon-library.net/images/no-user-image-icon/no-user-image-icon-27.jpg',
          timestamp: firebase.database.ServerValue.TIMESTAMP,
        })
        .then(() => {
          setMessage('');
          console.log('nice');
        });
    }
  };
  const handleMessage = e => {
    setMessage(e.target.value);
  };
  const emojiClick = e => {
    setMessage(message + e.native);
  };
  const showEmoji = gif => {
    let secondsToGo = 3;
    setEmojiShow({
      state: true,
      url: gif.url
    })
    setTimeout(() => {
      setEmojiShow({
        state: false,
        url: ""
      });
    }, secondsToGo * 1000);
  }
  const emojiContent = (
    <div className="emoji-popover-content">
      <div>
        {GifChild.map(gif => {
          return (
              <img onClick={() => showEmoji(gif)} className="gif-picker-section" src={gif.url} alt={gif.url} />
          )
        })}
      </div>
      <div>
        {GifAdult.map(gif => {
          return (
              <img onClick={() => showEmoji(gif)} className="gif-picker-section" src={gif.url} alt={gif.url} />
          )
        })}
      </div>
      <div>
        {GifGroup.map(gif => {
          return (
              <img onClick={() => showEmoji(gif)} className="gif-picker-section" src={gif.url} alt={gif.url} />
          )
        })}
      </div>
    </div>
  );
  
  console.log(props, 'props.user');
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
          {props.role === "teacher" && 
            <Popover placement="topLeft" className="chatbox-popover"  content={emojiContent}>
              <Button className="more-button">
              < Icon type="appstore" theme="filled" className="send-icon" />
              </Button>
            </Popover>
          }
          <Popover
            placement="topRight"
            content={<Picker onSelect={emojiClick} />}
            trigger="click"
            className="emoji-button"
          >
            <Button>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ899Ul2vNvOC2958E80je-twW9BNs0CveqgZuvYYrkecloJL5naw"
                alt="send"
                className="send-icon"
              />
            </Button>
          </Popover>
          <Button onClick={handleSend} className="send-button">
            <img src={sendIcon} alt="send" className="send-icon" />
          </Button>
        </div>
        
      </div>
      <Modal
          className="modal-gif"
          style={{ top: 20 }}
          visible={emojiShow.state}
          footer={null}
          title={null}
          onCancel={() => {
            setEmojiShow(false)
          }}
    
          maskClosable={true}
        >
          <img className="gif-section" src={emojiShow.url} alt={emojiShow.title} />
      </Modal>
    </section>
  );
};

export default Chatbox;
