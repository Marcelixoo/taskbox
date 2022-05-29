import React from 'react';

import { configureStore, createSlice } from '@reduxjs/toolkit';

import { Provider } from 'react-redux';

import { TaskList } from './TaskList';

import { TASK_PINNED } from './Task';
import * as TaskStories from './Task.stories';

const example = { ...TaskStories.Default.args.task };
export const MockedState = {
  tasks: [
    { ...example, id: '1', title: 'Do the laundry' },
    { ...example, id: '2', title: 'Brush your teeth' },
    { ...example, id: '3', title: 'Finish this tutorial' },
    { ...example, id: '4', title: 'Cook lunch' },
    { ...example, id: '5', title: 'Another task' },
    { ...example, id: '6', title: 'Some more tasks for this poor baby' },
  ],
  status: 'idle',
  error: null,
};

const MockedStore = ({ initialState, children }) => {
  const store = configureStore({
    reducer: {
      taskbox: createSlice({
        name: 'taskbox',
        initialState,
        reducers: {
          updateTaskState: (state, action) => {
            const { id, newTaskState } = action.payload;

            state.tasks = state.tasks.map((task) => {
              if (task.id === id) {
                return {
                  ...task,
                  state: newTaskState,
                };
              }
              return task;
            });
          },
        },
      }).reducer
    },
  });

  return <Provider store={store}>{children}</Provider>
}

export default {
  component: TaskList,
  title: 'TaskList',
  excludeStories: /.*MockedState$/,
};

const Template = args => (
  <div style={{ padding: '3rem' }}>
    <TaskList {...args} />
  </div>
);

export const Default = Template.bind({});
Default.decorators = [
  (story) => <MockedStore initialState={MockedState}>{story()}</MockedStore>
]

export const WithPinnedItems = Template.bind({});
WithPinnedItems.decorators = [
  (story) => {
    const initialState = {
      ...MockedState,
      tasks: [
        ...MockedState.tasks.slice(0, 4),
        { ...example, id: '5', title: 'Take a break (pinned)', state: TASK_PINNED },
        { ...example, id: '6', title: 'Call your bro (pinned)', state: TASK_PINNED },
      ]
    };

    return <MockedStore initialState={initialState}>{story()}</MockedStore>
  }
]

export const Loading = Template.bind({});
Loading.decorators = [
  (story) => {
    const initialState = {
      ...MockedState,
      status: 'loading',
    };

    return <MockedStore initialState={initialState}>{story()}</MockedStore>
  }
];

export const Empty = Template.bind({});
Empty.decorators = [
  (story) => {
    const initialState = {
      ...MockedState,
      tasks: [],
    };

    return <MockedStore initialState={initialState}>{story()}</MockedStore>
  }
];