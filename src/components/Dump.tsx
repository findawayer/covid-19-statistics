import type { FunctionComponent } from 'react';
import React from 'react';

interface DumpProps {
  data: Record<string, unknown> | Record<string, unknown>[] | null;
}

const Dump: FunctionComponent<DumpProps> = ({ data }) => {
  if (!data) return null;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default Dump;
