import styled from '@emotion/styled';

// CSS-loaders | Copyright (c) 2014 Luke Haas | MIT license
// https://github.com/lukehaas/css-loaders
export const StyledLoading = styled.div<{ isCentered?: boolean }>`
  position: relative;
  width: 10em;
  height: 10em;
  margin: 55px auto;
  color: #aaa;
  box-shadow: inset 0 0 0 1em;
  transform: translateZ(0);

  ${({ isCentered }) =>
    isCentered &&
    `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `}

  &,
  &::before,
  &::after {
    border-radius: 50%;
  }
  &::before,
  &::after {
    position: absolute;
    content: '';
  }
  &::before {
    top: -0.1em;
    left: -0.1em;
    width: 5.2em;
    height: 10.2em;
    background: #fff;
    border-radius: 10.2em 0 0 10.2em;
    transform-origin: 5.1em 5.1em;
    animation: load2 2s infinite ease 1.5s;
  }
  &::after {
    top: -0.1em;
    left: 4.9em;
    width: 5.2em;
    height: 10.2em;
    background: #fff;
    border-radius: 0 10.2em 10.2em 0;
    transform-origin: 0.1em 5.1em;
    animation: load2 2s infinite ease;
  }

  @keyframes load2 {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
