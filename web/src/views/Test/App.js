import React from 'react';
import './App.css';
import TopBarTag from '../kTagging/TopBarTag';
import Login from './Login';
import Join from './Join';
import MainContents from '../kTagging/MainTag/MainContentTag';
import FooterTag from '../kTagging/FooterTag';


function App() {
  return (
    <div className="App">
      <TopBarTag />

      {/* <Login /> */}
      {/* <Join /> */}
      <MainContents />

      <FooterTag />
    </div>
  );
}

export default App;
