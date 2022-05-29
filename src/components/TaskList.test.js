import { screen, render, within, prettyDOM } from '@testing-library/react';

import user from '@testing-library/user-event';

import { composeStories } from '@storybook/testing-react';

import * as TaskListStories from './TaskList.stories';

// composeStories handles all information related to the component, i.e args
const { WithPinnedItems } = composeStories(TaskListStories);

const getAllTasksOnScreen = () => {
  return screen.getAllByRole('listitem')
    .map((item) => ({
      element: item,
      title: within(item)
        .getByTestId(/title-/i)
        .value,
      input: within(item)
        .getByTestId(/input-/i),
      clickable: within(item)
        .getByTestId(/clickable-/i),
    }));
}

const withinTaskBox = {
  getMatchTo: (callback) => getAllTasksOnScreen().find(callback),
  getLastTask: () => getAllTasksOnScreen().pop(),
  getFirstTask: () => getAllTasksOnScreen().shift(),
}

it('renders pinned tasks at the top of the list', () => {
  const { getAllByRole } = render(<WithPinnedItems />);

  const items = getAllByRole('listitem');
  expect(items).toHaveLength(6);

  const firstTwoItems = items.slice(0, 2);
  firstTwoItems.forEach((item) => {
    const { getByRole } = within(item);
    expect(getByRole('textbox').value).toMatch(/(pinned)/i);
  });
});

it('renders archived tasks at the bottom of the list', async () => {
  render(<WithPinnedItems />);

  const taskToArchive = withinTaskBox
    .getMatchTo((task) => task.title === 'Do the laundry');

  await user.click(taskToArchive.clickable);

  expect(withinTaskBox.getLastTask().title).toEqual('Do the laundry');
})