import React from 'react';
import './App.css';
import TopBar from './TopBar';
import Login from './Login';
import Join from './Join';
import MainContents from './MainContents';
import Footer from './Footer';


function App() {
  return (
    <div className="App">
      <TopBar />

      {/* <Login /> */}
      {/* <Join /> */}
      <MainContents />

      <Footer />
    </div>
  );
}

export default App;
