import React, { Component } from 'react';

import Header from './Header';
import Footer from './Footer';

class Layout extends Component {
  render() {
    return (
      <section className="Layout-section">
        <Header />
            <main className="content-section">{this.props.children}</main>
        <Footer />
      </section>
    );
  }
}

export default Layout;
