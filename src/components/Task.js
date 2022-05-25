import React from 'react';
import PropTypes from 'prop-types';

export const TASK_ARCHIVED = 'TASK_ARCHIVED';
export const TASK_INBOX = 'TASK_INBOX';
export const TASK_PINNED = 'TASK_PINNED';

export default function Task({ task: { id, title, state }, onArchiveTask, onPinTask }) {
  return (
    <div className={`list-item ${state}`}>
      <label className="checkbox">
        <input
          type="checkbox"
          defaultChecked={state === TASK_ARCHIVED}
          disabled={true}
          name="checked"
        />
        <span
          className="checkbox-custom"
          onClick={() => onArchiveTask(id)}
          id={`archiveTask-${id}`}
          aria-label={`archiveTask-${id}`}
        />
      </label>

      <label className="title">
        <input type="text" value={title} readOnly={true} placeholder="Input title" />
      </label>

      <div className="actions" onClcik={e => e.stopPropagation()}>
        {state !== TASK_ARCHIVED && (
          <a onClick={() => onPinTask(id)}>
            <span className="icon-star" id={`pinTask-${id}`} aria-label={`pinTask-${id}`} />
          </a>
        )}

      </div>

    </div>
  )
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }),
  onArchiveTask: PropTypes.func,
  onPinTask: PropTypes.func,
}