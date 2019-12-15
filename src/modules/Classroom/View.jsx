import React, { useEffect, useState } from 'react';
import Videos from './components/Videos';
import Chatbox from './components/Chatbox';
import Documents from './components/Documents';
import WritingBoard from './components/WritingBoard';
import axios from 'axios';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { SizeMe } from 'react-sizeme';

const Classroom = () => {
  const [user, setUser] = useState({});
  const [background, setBackground] = useState("");
  const urlParams = new URLSearchParams(window.location.search);
  const roomParam = urlParams.get('room');
  const roleParam = urlParams.get('role');
  const idParam = urlParams.get('id');
  if (!roomParam || !roleParam || !idParam) {
    console.log('not exist');
  }
  useEffect(() => {
    if (roleParam === 'teacher') {
      axios
        .get(
          `http://ec2-18-222-70-27.us-east-2.compute.amazonaws.com:3001/teacher/${idParam}`,
        )
        .then(response => {
          setUser(response.data.user);
          // setTeacher(response.data.user);
        })
        .catch(error => {
          console.error(error);
        });
    } else if (roleParam === 'student') {
      axios
        .get(
          `http://ec2-18-222-70-27.us-east-2.compute.amazonaws.com:3001/student/${idParam}`,
        )
        .then(response => {
          setUser(response.data.user);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      console.log('user not exist');
    }
  }, []);
  const handleBackground = value => {
    setBackground(value)
  }
  return (
    <SizeMe>
      {({ size }) => {
        const hasExceedLargeScreen = size.width > 1600
        const smSize = [5, 13, 5]
        const lgSize = [24, 24, 24]
        const colSize = hasExceedLargeScreen ? smSize : lgSize
        return (
          <section className="classroom-section" 
            style={{
              backgroundImage:`url(${background})`,
              backgroundSize: 'cover'
              // height:"100%",
              // width:"100%"
              // backgroundRepeat:"no-repeat"
            }}
          >
            <div className="classroom-item video">
              <Videos role={roleParam}  handleBackground={handleBackground}/>
            </div>

            <div className="classroom-item white-board">
              <WritingBoard user={user} />
            </div>

            <div className="classroom-item right-side">
              <div className="classroom-item-right">
                <Documents user={user} room={roomParam} />
              </div>

              <div className="classroom-item-right">
                <Chatbox user={user} role={roleParam} room={roomParam} />
              </div>
            </div>
          </section>
        )
      }}
    </SizeMe>

  );
};

export default Classroom;
