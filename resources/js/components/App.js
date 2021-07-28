import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Streamers from './pages/Streamers';
import Header from './components/Header'
import { UserInfo } from './global/AppContext'
import MostViewed from './pages/MostViewed'
import Longest from './pages/Longest'
import StreamerVods from './components/StreamerList/streamerVods'
import VideoPlayer from './components/Player'
import Search from './pages/Search'
import Game from './pages/Game'
import GameVods from './pages/Game/GameVods'
import ErrorBoundary from './global/ErrorBoundary'

const App = () => {
  const [userInfo, setUserInfo] = useState({})

  return (
    <UserInfo.Provider value={[userInfo, setUserInfo]}>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' render={() => <ErrorBoundary children={<Home />} />} />
          <Route path='/twitch/mostViewed' render={() => <ErrorBoundary children={<MostViewed />} />} />
          <Route path='/twitch/longest' render={() => <ErrorBoundary children={<Longest />} />} />
          <Route path='/twitch/streamers' render={() => <ErrorBoundary children={<Streamers />} />} />
          <Route path='/twitch/games/:name' render={() => <ErrorBoundary children={<GameVods />} />} />
          <Route path='/twitch/games' render={() => <ErrorBoundary children={<Game />} />} />
          <Route path='/twitch/about' render={() => <ErrorBoundary children={<About />} />} />
          <Route path='/twitch/streamer/:name' render={() => <ErrorBoundary children={<StreamerVods />} />} />
          <Route path='/twitch/video/:video_id' render={() => <ErrorBoundary children={<VideoPlayer />} />} />
          <Route path='/twitch/search' render={() => <ErrorBoundary children={<Search />} />} />
        </Switch>
      </Router>
    </UserInfo.Provider>
  );
}

export default App;

if (document.getElementById('root')) {
  ReactDOM.render(<App />, document.getElementById('root'));
}
