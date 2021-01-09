import type { FunctionComponent } from 'react';
import React from 'react';

import { StyledLoading } from './styles/Loading';

const Loading: FunctionComponent = () => (
  <StyledLoading role="presentation" aria-label="Loading" />
);

export default Loading;
