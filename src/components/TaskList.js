import React from 'react';

import PropTypes from 'prop-types';

import Task, { TASK_PINNED } from './Task';

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

export function TaskList({ tasks, loading, onPinTask, onArchiveTask }) {

  if (loading) {
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
    <ul>
      {tasksInOrder.map((task) => (
        <li key={task.id}>
          <Task task={task} onArchiveTask={onArchiveTask} onPinTask={onPinTask} />
        </li>
      ))}
    </ul>
  );
}

TaskList.propTypes = {
  /** The list of tasks to be rendered */
  tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
  /** Whether tasks are still being loaded or not */
  loading: PropTypes.bool,
  /** Event that changes a task state to pinned */
  onPinTask: PropTypes.func,
  /** Event that changes a task state to archived */
  onArchiveTask: PropTypes.func,
};

TaskList.defaultProps = {
  loading: false,
};

export default TaskList;