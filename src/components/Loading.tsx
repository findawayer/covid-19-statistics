import type { FunctionComponent } from 'react';
import React from 'react';

import { StyledLoading } from './styles/Loading';

interface LoadingProps {
  size?: number;
}

/* SVG-loaders | 2014 Sam Herbert, MIT License | https://github.com/SamHerbert/SVG-Loaders */
const Loading: FunctionComponent<LoadingProps> = ({ size = 64 }) => {
  return (
    <StyledLoading aria-label="Loading">
      <svg
        width={size}
        height={size}
        viewBox="0 0 38 38"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#3498DB"
      >
        <g fill="none" fill-rule="evenodd">
          <g transform="translate(1 1)" stroke-width="2">
            <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
            <path d="M36 18c0-9.94-8.06-18-18-18">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>
      </svg>
    </StyledLoading>
  );
};

export default Loading;
