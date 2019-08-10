import React from 'react';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import { documentData } from '../../helpers/fakeData';

const Documents = () => (
  <section className="documents-section">
    <h1 className="title">
      <Icon type="book" /> DOCUMENTS
    </h1>
    <div className="content">
      {documentData.map(item => (
        <Button className="item" key={item.id}>
          <Icon type="file-text" className="item-icon" />
          <span className="item-title">{item.fileName}</span>
        </Button>
      ))}
    </div>
  </section>
);

export default Documents;
