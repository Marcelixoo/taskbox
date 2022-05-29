import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Task, { TASK_ARCHIVED, TASK_INBOX, TASK_PINNED } from './Task';

import { updateTaskState } from '../store';

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
  const tasks = useSelector((state) => {
    const tasksInOrder = [
      ...state.taskbox.tasks.filter((t) => t.state === TASK_PINNED),
      ...state.taskbox.tasks.filter((t) => t.state !== TASK_PINNED),
    ];
    const filteredTasks = tasksInOrder.filter(
      (t) => [TASK_INBOX, TASK_PINNED, TASK_ARCHIVED].includes(t.state)
    );
    return filteredTasks;
  });

  const { status } = useSelector((state) => state.taskbox);

  const dispatch = useDispatch();

  return {
    tasks,
    status,
    dispatch
  };
}

export function TaskList() {
  /** Get initial state from the store */
  const { tasks, status, dispatch } = useTaskBox();

  const pinTask = (value) => {
    dispatch(updateTaskState({ id: value, newTaskState: TASK_PINNED }));
  }

  const archiveTask = (value) => {
    dispatch(updateTaskState({ id: value, newTaskState: TASK_ARCHIVED }));
  }

  if (status === 'loading') {
    return <Loading />
  }

  if (tasks.length === 0) {
    return <Empty />;
  }

  const tasksInOrder = [
    ...tasks.filter((t) => t.state === TASK_PINNED),
    ...tasks.filter((t) => t.state !== TASK_PINNED)
  ]

  return (
    <ul data-testid="task-list">
      {tasksInOrder.map((task) => (
        <li key={task.id}>
          <Task task={task} onArchiveTask={() => archiveTask(task.id)} onPinTask={() => pinTask(task.id)} />
        </li>
      ))}
    </ul>
  );
}

export default TaskList;