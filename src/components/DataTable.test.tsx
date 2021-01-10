import { render } from '@testing-library/react';

import DataTable from './DataTable';
import { tableColumns, tabularData } from '../mocks/modules/tabular-data';

describe('<DataTable />', () => {
  it('should render data as table', () => {
    const handleColumnClick = jest.fn();
    const { container } = render(
      <DataTable
        data={tabularData}
        columns={tableColumns}
        idKey="name"
        sortKey="name"
        sortDirection="descending"
        handleColumnClick={handleColumnClick}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
