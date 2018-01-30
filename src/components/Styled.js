import styled from 'emotion/react';

export const Body = styled('div')`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url('background.png');
  background-size: cover;
  font-family: 'Open Sans', sans-serif;
`;

export const SlideWrapper = styled('div')`
  display: flex;
  max-height: 100vh;
`;
