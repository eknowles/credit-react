import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { BubbleButton } from '../Styled';

import Slide from './Slide';

class CreditReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
    };

    this.numberFormat = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });

    this._setup();
  }

  _setup() {
    const info = this.props.report.creditReportInfo;

    const change = info.changeInLongTermDebt;
    const totalLimit = info.currentLongTermCreditLimit + info.currentShortTermCreditLimit;

    this.slides = [
      {
        color: '#dfb7f6',
        title: 'Your credit score is',
        subtitle: `out of ${info.maxScoreValue}`,
        value: info.score,
        accent: info.equifaxScoreBandDescription,
        total: info.maxScoreValue,
        valueFormatter: null
      },
      {
        color: '#f2bb88',
        title: 'Your long term debt is',
        subtitle: `Total credit limit ${this.formatCurrency(totalLimit)}`,
        value: info.currentLongTermDebt,
        accent: `${change < 0 ? 'Down' : 'Up'} ${this.formatCurrency(Math.abs(change))} from last month`,
        total: totalLimit,
        valueFormatter: this.formatCurrency.bind(this)
      },
      {
        color: '#6df294',
        title: 'Ed Knowles',
        subtitle: `UI Developer`,
        value: 1234,
        accent: `efk.me`,
        total: 10000,
        valueFormatter: null
      }
    ];
  }

  componentDidMount() {
    setTimeout(() => {
      if (!this.state.currentIndex) {
        this.nextSlide();
      }
    }, 5000);
  }

  nextSlide() {
    if (this.state.currentIndex === this.slides.length - 1) {
      this.setState({currentIndex: 0});
    } else {
      this.setState({currentIndex: this.state.currentIndex + 1});
    }
  }

  formatCurrency(value) {
    return this.numberFormat.format(value);
  }

  render() {
    return (
      <BubbleButton onClick={this.nextSlide.bind(this)}>
        <Slide
          color={this.slides[this.state.currentIndex].color}
          slideValue={this.slides[this.state.currentIndex].value}
          total={this.slides[this.state.currentIndex].total}
          title={this.slides[this.state.currentIndex].title}
          subtitle={this.slides[this.state.currentIndex].subtitle}
          accent={this.slides[this.state.currentIndex].accent}
          format={this.slides[this.state.currentIndex].valueFormatter}></Slide>
      </BubbleButton>
    );
  }
}

CreditReport.propTypes = {
  report: PropTypes.shape({}),
};

export default CreditReport;

