import styled from 'emotion/react';

export const Body = styled('div')`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url('background.png');
  background-position: center;
  background-size: cover;
`;

export const SlideWrapper = styled('div')`
  display: flex;
  height: 300px;
  max-height: 100vh;
  max-width: 100vw;
  cursor: pointer;
`;
