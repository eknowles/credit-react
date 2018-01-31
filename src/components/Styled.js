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

export const BubbleButton = styled('button')`
  margin: 0;
  padding: 0;
  outline: none;
  border: none;
  background: none;
  transition: transform 50ms ease-in;
  &:active {
    transform: scale(0.95);
  }
`;

export const DemoText = styled('div')`
  margin-top: 2em;
  letter-spacing: 1px;
  font-weight: 600;
`;
