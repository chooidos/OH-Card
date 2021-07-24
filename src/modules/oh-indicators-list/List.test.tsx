import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { List } from './List';
import { store } from '../../store';

describe('ItemsModule', () => {
  it('should fetch list of all the items when rendered', async () => {
    render(<Provider store={store}><List /></Provider>);
    const items = await screen.findAllByRole('listitem');
    expect(items.length).toBe(44);
  });
});
