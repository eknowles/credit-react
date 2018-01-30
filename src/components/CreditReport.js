import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Slide from './Slide';

class CreditReport extends Component {
  constructor(props) {
    super(props);

    this.numberFormat = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });

    const info = this.props.report.creditReportInfo;
    const change = info.changeInLongTermDebt;

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
        subtitle: `Total credit limit ${this.formatCurrency(info.currentLongTermCreditLimit + info.currentShortTermCreditLimit)}`,
        value: info.currentLongTermDebt,
        accent: `${change < 0 ? 'Down' : 'Up'} ${this.formatCurrency(Math.abs(change))} from last month`,
        total: info.currentLongTermCreditLimit,
        valueFormatter: this.formatCurrency.bind(this)
      }
    ];
  }

  formatCurrency(value) {
    return this.numberFormat.format(value);
  }

  render() {

    return (
      this.slides.map((slide, index) => (<Slide
        key={index}
        color={slide.color}
        slideValue={slide.value}
        total={slide.total}
        title={slide.title}
        subtitle={slide.subtitle}
        accent={slide.accent}
        format={slide.valueFormatter}
      ></Slide>))
    );
  }
}

CreditReport.propTypes = {
  report: PropTypes.shape({}),
};

export default CreditReport;
