import React from 'react';

import { Provider } from 'react-redux';

import { rest } from 'msw';
import { MockedState } from './TaskList.stories';

import store, { endpoint } from '../store';

import InboxScreen from './InboxScreen';


export default {
  component: InboxScreen,
  title: 'Screens/InboxScreen',
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
};

const Template = () => <InboxScreen />;

export const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: [
      rest.get(endpoint, (_, res, ctx) => {
        return res(
          ctx.json(MockedState.tasks)
        );
      }),
    ],
  },
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