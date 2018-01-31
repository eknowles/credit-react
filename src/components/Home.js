import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CreditReport from './CreditReport/CreditReport';

import { DemoText } from './Styled';

class Home extends Component {
  render() {
    return (
      <div>
        <CreditReport report={this.props.report}></CreditReport>
        <DemoText>
          <p>Click to goto next slide</p>
          <a href="https://github.com/eknowles/credit-react" target="_blank">Source code</a>
        </DemoText>
      </div>
    );
  }
}

Home.propTypes = {
  report: PropTypes.shape({}).isRequired,
};

export default connect(state => ({report: state.report}))(Home);
