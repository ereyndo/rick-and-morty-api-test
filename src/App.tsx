import React from 'react';
// import styles from 'app.module.scss';
import {BrowserRouter as Router} from 'react-router-dom';
import {Header} from './components/Header';
import {Footer} from './components/Footer';
import {Content} from './components/Content';

const App = () => {
  return (
    <Router>
      <Header/>
      <Content/>
      <Footer/>
    </Router>
  );
};

export default App;
