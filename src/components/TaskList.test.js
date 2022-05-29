import { render, within } from '@testing-library/react';

import { composeStories } from '@storybook/testing-react';

import * as TaskListStories from './TaskList.stories';

// composeStories handles all information related to the component, i.e args
const { WithPinnedItems } = composeStories(TaskListStories);

it('renders pinned tasks at the top of the list', () => {
  const { getAllByRole } = render(<WithPinnedItems />);

  const items = getAllByRole('listitem');
  expect(items).toHaveLength(6);

  const firstTwoItems = items.slice(0, 2);
  firstTwoItems.forEach((item) => {
    const { getByRole } = within(item);
    expect(getByRole('textbox').value).toMatch(/(pinned)/i);
  })
})