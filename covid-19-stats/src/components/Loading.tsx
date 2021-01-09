import type { FunctionComponent } from 'react';
import React from 'react';

import { StyledLoading } from './styles/Loading';

interface LoadingProps {
  isCentered?: boolean;
}

const Loading: FunctionComponent<LoadingProps> = ({ isCentered }) => (
  <StyledLoading
    isCentered={isCentered}
    role="presentation"
    aria-label="Loading"
  />
);

export default Loading;
