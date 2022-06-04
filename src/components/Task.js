import React from 'react';
import PropTypes from 'prop-types';

export const TASK_ARCHIVED = 'TASK_ARCHIVED';
export const TASK_INBOX = 'TASK_INBOX';
export const TASK_PINNED = 'TASK_PINNED';

function Task({ task, onArchiveTask, onPinTask }) {
  const { id, title, state } = task;
  return (
    <li data-testid={`task-${id}`} className={`list-item ${state}`} style={{ background: 'red' }}>
      <label className="checkbox">
        <input
          data-testid={`input-${id}`}
          type="checkbox"
          checked={state === TASK_ARCHIVED}
          disabled={true}
          name="checked"
        />
        <span
          data-testid={`clickable-${id}`}
          className="checkbox-custom"
          onClick={() => onArchiveTask(task)}
          id={`archiveTask-${id}`}
          aria-label={`archiveTask-${id}`}
        />
      </label>

      <label className="title">
        <input data-testid={`title-${id}`} type="text" value={title} readOnly={true} placeholder="Input title" />
      </label>

      <div className="actions" onClick={e => e.stopPropagation()}>
        {state !== TASK_ARCHIVED && (
          <a onClick={() => onPinTask(task)}>
            <span className="icon-star" id={`pinTask-${id}`} aria-label={`pinTask-${id}`} />
          </a>
        )}

      </div>

    </li>
  )
}

Task.propTypes = {
  /** A single task item */
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }),
  /** Event that changes a task state to archived */
  onArchiveTask: PropTypes.func,
  /** Event that changes a task state to pinned */
  onPinTask: PropTypes.func,
}

export default Task;