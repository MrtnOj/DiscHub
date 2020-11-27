import React, { Component, Suspense, lazy } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router';
import { connect } from 'react-redux';

import Layout from './components/Layout/Layout';
// import ScoreCards from './containers/ScoreCard/Cards/Cards';
import ChooseCourse from './containers/ChooseCourse/ChooseCourse';
import ScoreCardInit from './containers/ScoreCard/ScoreCardInit/ScoreCardInit';
// import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
// import RoundScores from './containers/Rounds/RoundScores';
// import RoundScoreCard from './containers/Rounds/RoundScoreCard/RoundScoreCard';
// import WeatherCards from './containers/Weather/WeatherCards';
import * as actions from './store/actions/auth';

const ScoreCards = lazy(() => import('./containers/ScoreCard/Cards/Cards'));
const WeatherCards = lazy(() => import('./containers/Weather/WeatherCards'));
const Auth = lazy(() => import('./containers/Auth/Auth'));
const RoundScores = lazy(() => import('./containers/Rounds/RoundScores'));
const RoundScoreCard = lazy(() => import('./containers/Rounds/RoundScoreCard/RoundScoreCard'));


class App extends Component {

  componentDidMount () {
    this.props.onTryAutoSignup(this.props.token, this.props.userId, this.props.name, this.props.expirationDate);
  }

  render () {
    let routes = (
      <Switch>
        <Route path="/scoring" component={ScoreCards} />
        <Route path="/auth" component={Auth} />
        <Route path="/playerselect" component={ScoreCardInit} />
        <Route path="/weather" component={WeatherCards} />
        <Route path="/" exact component={ChooseCourse} />
        <Redirect to="/" />
      </Switch>
    );

    if ( this.props.token !== null ) {
      routes = (
        <Switch>
          <Route path="/scoring" component={ScoreCards} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />
          <Route path="/playerselect" component={ScoreCardInit} />
          <Route path="/weather" component={WeatherCards} />
          <Route path="/rounds/:user" component={RoundScores} />
          <Route path="/round/:id" component={RoundScoreCard} />
          <Route path="/" exact component={ChooseCourse} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          {routes}
        </Suspense>
      </Layout>
    )
  } 
}

const mapStateToProps = state => {
  return {
    token: state.token,
    userId: state.userId,
    name: state.userName,
    expirationDate: state.expirationDate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: (token, userId, name, expirationDate) => dispatch( actions.authCheckState(token, userId, name, expirationDate) )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ));