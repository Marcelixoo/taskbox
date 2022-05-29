import React from 'react';

import Task, { TASK_ARCHIVED, TASK_INBOX, TASK_PINNED } from './Task';

export default {
  component: Task,
  title: 'Task',
};

const Template = args => <Task {...args} />;

export const Default = Template.bind({});
Default.args = {
  task: {
    id: '1',
    title: 'Testing task',
    state: TASK_INBOX,
    updatedAt: (new Date(2022, 0, 1, 9, 0)).toDateString(),
  },
};

export const Pinned = Template.bind({});
Pinned.args = {
  task: {
    ...Default.args.task,
    state: TASK_PINNED,
  },
};

export const Archived = Template.bind({});
Archived.args = {
  task: {
    ...Default.args.task,
    state: TASK_ARCHIVED,
  },
};