import React from 'react';
import classnames from 'classnames';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import { messageData } from '../../helpers/fakeData';

const Chatbox = () => (
  <section className="chatbox-section">
    <h1 className="title">
      <Icon type="mail" /> CHATBOX
    </h1>
    <div className="content">
      <div className="message-container">
        {messageData.map(item => {
          const isFromUser = item.from === 'user';
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
                {item.message}
              </div>
              <div className="sent-details">
                <span className="sender-name">
                  {!isFromUser ? item.senderName : null}
                </span>
                <span className="time"> {item.time}</span>
              </div>
            </div>
          );
        })}
      </div>
      <Input.TextArea
        className="input-text"
        placeholder="Type a message..."
        autosize={{ minRows: 1, maxRows: 4 }}
      />
    </div>
  </section>
);

export default Chatbox;
