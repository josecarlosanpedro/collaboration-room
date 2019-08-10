import React from 'react';
import Icon from 'antd/lib/icon';
import { peopleData } from '../../helpers/fakeData';

const Videos = () => (
  <section className="videos-section">
    <h1 className="title">
      <Icon type="team" /> PEOPLE
    </h1>
    <div className="content">
      {peopleData.map(user => (
        <div className="item-user" key={user.id}>
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
);

export default Videos;
