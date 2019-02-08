import React, { Component } from 'react';
import Header from './components/Header';
import RetrieveTransactions from './components/RetrieveTransactions';
import styles from './styles/styles.scss';

class App extends Component {

  render() {
    return (
      <div>
        <Header/>
        <RetrieveTransactions/>
      </div>
    );
  }
}

export default App;
