import React from 'react';
import Videos from './components/Videos';
import Chatbox from './components/Chatbox';
import Documents from './components/Documents';
import WritingBoard from './components/WritingBoard';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

const Classroom = () => (
  <section className="classroom-section">
    <Col md={24} lg={5} className="classroom-item">
      <Videos />
    </Col>

    <Col lg={12} md={24} className="classroom-item">
      <WritingBoard />
    </Col>

    <Col lg={7} md={24} className="classroom-item">
      <Row className="classroom-item-right">
        <Documents />
      </Row>

      <Row className="classroom-item-right">
        <Chatbox />
      </Row>
    </Col>
  </section>
);

export default Classroom;
