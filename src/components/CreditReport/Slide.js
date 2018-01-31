import React, { Component } from 'react';
import PropTypes from 'prop-types';
import anime from 'animejs';

import { SlideWrapper } from '../Styled';

class Slide extends Component {
  constructor(props) {
    super(props);

    this.dynamicScore = {
      current: 0,
      total: this.props.total
    };
  }

  componentDidMount() {
    this.radius = +this.refs.bar.getAttribute('r');
    const {circumference} = Slide.flattenValues(this.props.slideValue, this.props.total, this.radius);
    this.refs.bar.setAttribute('stroke-dasharray', circumference.toString()); //
    const enter = anime.timeline(); // to exit we can use reverse on this timeline
    enter
    .add({
      targets: this.refs.svg,
      scale: [0, 1],
      duration: 3000,
      offset: 0
    })
    ;
    this._loadSlide();
  }

  componentDidUpdate() {
    this._loadSlide();
  }

  _loadSlide() {
    const {percentage} = Slide.flattenValues(this.props.slideValue, this.props.total, this.radius);
    const timeline = anime.timeline();

    // Update the text accent colors
    timeline

    // Simulate a press action on the whole element
    .add({
      targets: this.refs.svg,
      scale: [0.95, 1],
      duration: 450,
      offset: 0
    })

    .add({targets: '.bubble__text--color', fill: this.props.color, duration: 2000, elasticity: 600, offset: 500})

    // Animate the Progress Bar
    .add({
      targets: this.refs.bar,
      strokeDashoffset: percentage,
      stroke: this.props.color,
      duration: 2000,
      offset: 500
    })

    // Update the main Score value
    .add({
      targets: this.dynamicScore,
      current: this.props.slideValue,
      round: 1,
      duration: 1400,
      offset: 500,
      elasticity: 0,
      update: () => this._onUpdateMainValue()
    })

    // Animate the text off the screen and back on, this simulates the changing of slides
    .add({
      targets: this.refs.textGroup,
      translateX: [
        {value: -(this.radius / 2), duration: 500},
        {value: (this.radius / 2), duration: 0},
        {value: 0, duration: 500},
      ],
      opacity: [
        {value: 0, duration: 500},
        {value: 1, duration: 500},
      ],
      offset: 0
    });
  }

  /**
   * This method handles the DOM update for the main score value
   * @private
   */
  _onUpdateMainValue() {
    this.refs.slideValue.innerHTML = this.formatValue(this.dynamicScore.current);

    // Not the most optimal logic here, performance could be improved
    if (this.dynamicScore.current >= 10000) {
      this.refs.slideValue.style.fontSize = '68px';
      this.refs.slideValue.setAttribute('y', 220);
    } else {
      this.refs.slideValue.style.fontSize = null;
      this.refs.slideValue.setAttribute('y', 235);
    }
  }

  /**
   * @param value
   * @returns {*}
   */
  formatValue(value) {
    return this.props.format ? this.props.format(value) : value;
  }

  /**
   * Could have calculated circumference with anime.pathDashoffset.
   * @param segment
   * @param total
   * @param radius
   * @returns {{value: number, percentage: number, circumference: number}}
   */
  static flattenValues(segment, total, radius) {
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
          ref="svg"
          height="100%"
          width="100%"
          viewBox="0 0 400 400"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink">
          <defs>
            <clipPath id="clipPath">
              <circle cx="200" cy="200" r="170"/>
            </clipPath>
          </defs>
          <circle className="bubble__outline"
                  ref="outline"
                  r="198"
                  cx="200"
                  cy="200"></circle>
          <g transform="translate(0 400) rotate(-90 0 0)">
            <circle ref="bar"
                    className="bubble__bar"
                    r="190"
                    cx="200"
                    cy="200"
                    strokeDasharray="0"
                    strokeDashoffset="0"></circle>
          </g>

          <g clipPath="url(#clipPath)">
            <g ref="textGroup" style={{opacity: 0}}>
              <text className="bubble__text bubble__title" x="200" y="120">{this.props.title}</text>
              <text ref="slideValue" className="bubble__text bubble__text--color bubble__value" x="200" y="235"></text>
              <g className="fadeUp">
                <text className="bubble__text bubble__subtitle" x="200" y="275">{this.props.subtitle}</text>
              </g>
              <text className="bubble__text bubble__text--color bubble__accent" x="200"
                    y="315">{this.props.accent}</text>
            </g>
          </g>
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
