import React from 'react';

import { TaskList } from './TaskList';

import { TASK_PINNED } from './Task';
import * as TaskStories from './Task.stories';

export default {
  component: TaskList,
  title: 'TaskList',
  argTypes: {
    onArchiveTask: { action: 'archived' },
    onPinTask: { action: 'pinned' },
  }
};

const sample = { ...TaskStories.Default.args.task };

const Template = args => (
  <div style={{ padding: '3rem' }}>
    <TaskList {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  tasks: [
    { ...sample, id: '1', title: 'Do the laundry' },
    { ...sample, id: '2', title: 'Brush your teeth' },
    { ...sample, id: '3', title: 'Finish this tutorial' },
    { ...sample, id: '4', title: 'Cook lunch' },
    { ...sample, id: '5', title: 'Another task' },
    { ...sample, id: '6', title: 'Some more tasks for this poor baby' },
  ],
};

export const WithPinnedItems = Template.bind({});
WithPinnedItems.args = {
  tasks: [
    { ...sample, id: '1', title: 'Do the laundry' },
    { ...sample, id: '2', title: 'Brush your teeth (pinned)', state: TASK_PINNED },
    { ...sample, id: '3', title: 'Finish this tutorial (pinned)', state: TASK_PINNED },
    { ...sample, id: '4', title: 'Cook lunch' },
    { ...sample, id: '5', title: 'Another task' },
    { ...sample, id: '6', title: 'Some more tasks for this poor baby' },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  tasks: [],
  loading: true,
};

export const Empty = Template.bind({});
Empty.args = {
  tasks: [],
  loading: false,
};