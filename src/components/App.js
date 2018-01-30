import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from 'react-router-dom';
import Async from 'react-code-splitting';

import { Body } from './Styled';

const Home = () => <Async load={import('./Home')}/>;

const App = () => (
  <Body>
  <Switch>
    <Route path="/" component={Home}/>
  </Switch>
  </Body>
);

App.propTypes = {
  report: PropTypes.shape({}).isRequired,
};

export default withRouter(connect(state => ({report: state.report}))(App));
