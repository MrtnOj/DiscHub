import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';

import Layout from './components/Layout/Layout';
import ScoreCards from './containers/ScoreCard/Cards/Cards';
import ChooseCourse from './containers/ScoreCard/ScoreCardInit/ChooseCourse/ChooseCourse';
import ScoreCardInit from './containers/ScoreCard/ScoreCardInit/ScoreCardInit';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import RoundScores from './containers/Rounds/RoundScores';
import RoundScoreCard from './containers/Rounds/RoundScoreCard/RoundScoreCard';
import WeatherCards from './containers/Weather/WeatherCards';


function App() {
  return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/scoring" component={ScoreCards} />
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route path="/playerselect" component={ScoreCardInit} />
            <Route path="/rounds" component={RoundScores} />
            <Route path="/weather" component={WeatherCards} />
            <Route path="/:id" component={RoundScoreCard} />
            <Route path="/" exact component={ChooseCourse} />
          </Switch>
        </Layout>
      </BrowserRouter>
  );
}

export default App;