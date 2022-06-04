import React from 'react';

import { Provider } from 'react-redux';

import { rest } from 'msw';

import {
  fireEvent,
  within,
  waitForElementToBeRemoved
} from '@storybook/testing-library';

import store, { endpoint } from '../store';

import { MockedState } from './TaskList.stories';

import InboxScreen from './InboxScreen';


export default {
  component: InboxScreen,
  title: 'Screens/InboxScreen',
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
};

const waitForTasksToLoad = async (canvas) => {
  await waitForElementToBeRemoved(await canvas.findByTestId('loading'), {
    timeout: 1000,
  })
}

const pinOneTask = (canvas) => {
  setTimeout(() => {
    fireEvent.click(canvas.getByLabelText('pinTask-1'));
  }, 800);
};

const archiveOneTask = (canvas) => {
  setTimeout(() => {
    fireEvent.click(canvas.getByLabelText('archiveTask-3'));
  }, 2000)
}

const Template = () => <InboxScreen />;

export const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: [
      rest.get(endpoint, (_, res, ctx) => {
        return res(
          ctx.delay(800),
          ctx.json(MockedState.tasks)
        );
      }),
    ],
  },
};
Default.play = async({ canvasElement }) => {
  const canvas = within(canvasElement);

  await waitForTasksToLoad(canvas);

  pinOneTask(canvas);
  archiveOneTask(canvas);
};

export const Error = Template.bind({});
Error.parameters = {
  msw: {
    handlers: [
      rest.get(endpoint, (_, res, ctx) => {
        return res(ctx.status(403));
      })
    ]
  }
}