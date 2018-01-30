import styled from 'emotion/react';

export const Body = styled('div')`
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-image: url('background.png');
  background-position: center;
  background-size: cover;
  font-family: 'Open Sans', sans-serif;
`;

export const SlideWrapper = styled('div')`
  display: flex;
  height: 300px;
  max-height: 100vh;
  max-width: 100vw;
`;
