import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Task, { TASK_ARCHIVED, TASK_INBOX, TASK_PINNED } from './Task';

import { updateTaskState } from '../store';

const orderedTasks = (tasks) => ([
  ...tasks.filter((t) => t.state === TASK_PINNED),
  ...tasks.filter((t) => t.state === TASK_INBOX),
  ...tasks.filter((t) => t.state === TASK_ARCHIVED),
])

const LoadingRow = () => (
  <div className="loading-item">
    <span className="glow-checkbox" />
    <span className="glow-text">
      <span>Loading cool state</span>
    </span>
  </div>
);

const Loading = () => (
  <div className="list-items" data-testid="loading" key={"loading"}>
    <LoadingRow />
    <LoadingRow />
    <LoadingRow />
    <LoadingRow />
    <LoadingRow />
    <LoadingRow />
  </div>
)

const Empty = () => (
  <div className="list-items" key={"empty"} data-testid="loading">
    <div className="wrapper-message">
      <span className="icon-check" />
      <div className="title-message">You have no tasks left</div>
      <div className="subtitle-message">Sit back and relax</div>
    </div>
  </div>
)

function useTaskBox() {
  /** Get initial state from the store */
  const tasks = useSelector((state) => orderedTasks(state.taskbox.tasks));

  const { status } = useSelector((state) => state.taskbox);

  const dispatch = useDispatch();

  return {
    tasks,
    status,
    dispatch
  };
}

const toggleValues = (one, another) => ({
  basedOn: (predicate) => predicate === one ? another : one,
})

export function TaskList() {
  /** Get initial state from the store */
  const { tasks, status, dispatch } = useTaskBox();

  const pinTask = ({ id, state }) => {
    const newTaskState = toggleValues(TASK_INBOX, TASK_PINNED).basedOn(state);
    dispatch(updateTaskState({ id, newTaskState }));
  }

  const archiveTask = ({ id }) => {
    dispatch(updateTaskState({ id, newTaskState: TASK_ARCHIVED }));
  }

  if (status === 'loading') {
    return <Loading />
  }

  if (tasks.length === 0) {
    return <Empty />;
  }

  return (
    <ul data-testid="task-list">
      {orderedTasks(tasks).map((task) => (
        <Task key={task.id} task={task} onArchiveTask={archiveTask} onPinTask={pinTask} />
      ))}
    </ul>
  );
}

export default TaskList;