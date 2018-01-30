import React, { Component } from 'react';
import PropTypes from 'prop-types';
import anime from 'animejs';

import { SlideWrapper } from './Styled';

class Slide extends Component {

  constructor(props) {
    super(props);

    this.dynamicScore = {
      current: 0,
      total: this.props.total
    };
  }

  _update() {
    const radius = +this.refs.bar.getAttribute('r');
    const {value, percentage, circumference} = this.flattenValues(this.props.slideValue, this.props.total, radius);
    this.refs.bar.setAttribute('stroke-dasharray', circumference.toString());
    const timeline = anime.timeline();
    timeline
    .add({
      targets: '.fadeUp',
      duration: 800,
      opacity: [0, 1],
      translateY: [30, 0],
      easing: 'easeInOutSine',
      offset: 200
    })
    .add({
      targets: this.refs.bar,
      strokeDashoffset: [circumference, percentage],
      duration: 2000,
      elasticity: 600,
      offset: 650
    })
    .add({targets: this.refs.bar, strokeWidth: [20, 8], duration: 800, easing: 'easeInOutSine', offset: 650})
    .add({
      targets: this.dynamicScore,
      current: this.props.slideValue,
      round: 1,
      duration: 2000,
      offset: 650,
      update: () => {
        this.refs.slideValue.innerHTML = this.formatValue(this.dynamicScore.current);
        if (this.dynamicScore.current >= 10000) {
          this.refs.slideValue.style.fontSize = '68px';
          this.refs.slideValue.setAttribute('y', 220);
        } else {
          this.refs.slideValue.style.fontSize = null;
          this.refs.slideValue.setAttribute('y', 235);
        }
      }
    })
    .add({
      targets: '.bubble__text',
      translateX: [200, 0],
      translateY: [200, 0],
      strokeWidth: [400, 2],
      scale: [0, 1],
      opacity: [0, 1],
      duration: 800,
      elasticity: 300,
      offset: 400
    })
    .add({
      targets: this.refs.outline,
      translateX: [200, 0],
      translateY: [200, 0],
      strokeWidth: [400, 2],
      scale: [0, 1],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeInOutSine',
      offset: 0
    });
  }

  componentDidMount() {
    this._update();
  }

  componentDidUpdate() {
    this._update();
  }

  formatValue(value) {
    return this.props.format ? this.props.format(value) : value;
  }

  flattenValues(segment, total, radius) {
    let value = segment / total * 100;
    const circumference = Math.PI * (radius * 2);

    if (isNaN(value)) {
      value = 100;
    }
    if (value < 0) {
      value = 0;
    }
    if (value > 100) {
      value = 100;
    }

    const percentage = ((100 - value) / 100) * circumference;

    return {value, percentage, circumference};
  }

  render() {

    return (
      <SlideWrapper>
        <svg
          className="bubble"
          height="100%"
          width="100%"
          viewBox="0 0 400 400"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink">
          <circle
            className="bubble__outline"
            ref="outline"
            r="198"
            cx="200"
            cy="200"></circle>
          <g transform="translate(0 400) rotate(-90 0 0)">
            <circle
              className="bubble__bar"
              ref="bar"
              r="190"
              cx="200"
              cy="200"
              stroke={this.props.color}
              strokeDasharray="0"
              strokeDashoffset="0"></circle>
          </g>
          <text
            className="bubble__text bubble__title"
            x="200"
            y="120"
            textAnchor="middle">{this.props.title}</text>
          <text
            ref="slideValue"
            className="bubble__text bubble__value"
            x="200"
            y="235"
            fill={this.props.color}
            textAnchor="middle"></text>
          <g className="fadeUp">
            <text
              className="bubble__text bubble__subtitle"
              x="200"
              y="275"
              textAnchor="middle">{this.props.subtitle}</text>
          </g>
          <text
            className="bubble__text bubble__accent"
            x="200"
            y="315"
            fill={this.props.color}
            textAnchor="middle">{this.props.accent}</text>
        </svg>
      </SlideWrapper>
    );
  }
}

Slide.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  accent: PropTypes.string,
  color: PropTypes.string,
  slideValue: PropTypes.number,
  total: PropTypes.number,
  format: PropTypes.func
};

export default Slide;
