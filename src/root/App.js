import React, { Component } from "react";
import Layout from "../components/MainLayout";
import Routes from "../routes";
import firebase from "firebase";
import '../css/index.scss'
import 'emoji-picker-react/dist/universal/style.scss';


class App extends Component {
  camera = () => {
    window.addEventListener('load', () => {
      console.log('asdasd')
    })
  }
  componentDidMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyCzNT7kATK_7XzUxD3RcyQmo7XoV7Kv-QM",
      authDomain: "ale-classroom.firebaseapp.com",
      databaseURL: "https://ale-classroom.firebaseio.com",
      projectId: "ale-classroom",
      storageBucket: "ale-classroom.appspot.com",
      messagingSenderId: "613210030267",
      appId: "1:613210030267:web:360fffe3a910f6ee4ce99e"
    };
    firebase.initializeApp(firebaseConfig);
    this.camera()
  }

  render() {

    return (
      <div>
        <Layout>
          <Routes />
        </Layout>
      </div>
    );
  }
}

export default App;