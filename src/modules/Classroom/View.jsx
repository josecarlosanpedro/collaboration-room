import React, { useEffect, useState } from 'react';
import Videos from './components/Videos';
import Chatbox from './components/Chatbox';
import Documents from './components/Documents';
import WritingBoard from './components/WritingBoard';
import axios from 'axios'
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

const Classroom = () => {
  const [user, setUser] = useState({});
  const urlParams = new URLSearchParams(window.location.search);
  const roomParam = urlParams.get('room');
  const roleParam = urlParams.get('role');
  const idParam = urlParams.get('id');
  if (!roomParam || !roleParam || !idParam) {
    console.log('not exist')
  }
  useEffect(() => {
    if (roleParam === 'teacher') {
      axios
        .get(`http://ec2-18-222-70-27.us-east-2.compute.amazonaws.com:3001/teacher/${idParam}`)
        .then(response => {
          setUser(response.data.user)
          // setTeacher(response.data.user);
        })
        .catch(error => {
          console.error(error);
        });
    } else if (roleParam === 'student') {
      axios
        .get(`http://ec2-18-222-70-27.us-east-2.compute.amazonaws.com:3001/student/${idParam}`)
        .then(response => {
          setUser(response.data.user)
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      console.log('user not exist')
    }

  }, []);


  return (
    <section className="classroom-section">

      <Col md={24} lg={5} className="classroom-item">
        <Videos />
      </Col>

      <Col lg={12} md={24} className="classroom-item">
        <WritingBoard />
      </Col>

      <Col lg={7} md={24} className="classroom-item">
        <Row className="classroom-item-right">
          <Documents user={user} room={roomParam} />
        </Row>

        <Row className="classroom-item-right">
          <Chatbox user={user} room={roomParam} />
        </Row>
      </Col>
    </section>
  )
}


export default Classroom;
