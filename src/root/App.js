import React, { Component } from "react";
import Layout from "../components/MainLayout";
import Routes from "../routes";
import '../css/index.scss'
class App extends Component {
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