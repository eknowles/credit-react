import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CreditReport from './CreditReport/CreditReport';

class Home extends Component {
  render() {
    return (
      <CreditReport report={this.props.report}></CreditReport>
    );
  }
}

Home.propTypes = {
  report: PropTypes.shape({}).isRequired,
};

export default connect(state => ({report: state.report}))(Home);
